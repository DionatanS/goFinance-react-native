import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-native";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { Container, Header,Title, Form, Fields,TransactionTypes } from "./styles";

import { CategorySelect } from "../CategorySelect";
import { Category } from "../../components/Forms/CategorySelectButton/styles";
import { InputForm } from "../../components/Forms/InputForm";

interface FormData{
    name: string;
    amount: string;
}

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCagoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const { 
        control,
        handleSubmit
    } = useForm();

    function handleTransactionTypesSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal(){
        setCagoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal(){
        setCagoryModalOpen(false);
    }

    function handleRegister(form: FormData){
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
      console.log(data);  
    }

    return(
        <Container>
            <Header>
                <Title>
                    Cadastro
                </Title>
            </Header>
            <Form>
               <Fields>     
                <InputForm
                    control={control}
                    name="name"
                    placeholder="Nome"
                />
                <InputForm
                    control={control}
                    name="amount"
                    placeholder="Preço"
                />
                <TransactionTypes>
                    <TransactionTypeButton
                    type="up"
                    title="Income"
                    onPress={() =>handleTransactionTypesSelect('up')}
                    isActive={transactionType === 'up'}
                    />
                    <TransactionTypeButton
                    type="down"
                    title="Outcome"
                    onPress={() =>handleTransactionTypesSelect('down')}
                    isActive={transactionType === 'down'}
                    />
                </TransactionTypes>
                <CategorySelectButton 
                    onPress={handleOpenSelectCategoryModal}
                    title={category.name}
                />
               </Fields> 
                <Button 
                    onPress={handleSubmit(handleRegister)}
                    title="Enviar"
                />
            </Form>
            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    );
}