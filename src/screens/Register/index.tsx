import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'


import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { Container, Header,Title, Form, Fields,TransactionTypes } from "./styles";
import { CategorySelect } from "../CategorySelect";
import { Category } from "../../components/Forms/CategorySelectButton/styles";
import { InputForm } from "../../components/Forms/InputForm";

interface FormData{
    name: string;
    amount: number;
}

const Schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('O valor não poder ser negativo')
    .required('O valor é obrigatório')
});

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCagoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const { 
        control,
        handleSubmit,
        formState: { errors }

    } = useForm({
        resolver: yupResolver(Schema)
    });

    function handleTransactionTypesSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal(){
        setCagoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal(){
        setCagoryModalOpen(false);
    }

    async function handleRegister(form: FormData){
        if(!transactionType)
            return Alert.alert('Selecione o tipo da transação');
        if(category.key === 'category')  
            return Alert.alert('Selecione a categoria');  

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        try {
           const dataKey = "@gofinances:transactions" ;
           await AsyncStorage.setItem(dataKey, JSON.stringify(data));
        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar");
        }
      console.log(data);  
    }

    useEffect(()=>{
        async function loadData(){
            const data = await AsyncStorage.getItem(dataKey);    
            console.log(JSON.parse(data!));   
        }
    },[]);
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
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
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.name && errors.name.message}
                />
                <InputForm
                    control={control}
                    name="amount"
                    placeholder="Preço"
                    keyboardType="numeric"
                    error={errors.amount && errors.amount.message}
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
        </TouchableWithoutFeedback>  
    );
}