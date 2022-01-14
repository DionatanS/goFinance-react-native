import React from "react";
import {Text, View} from 'react-native'
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard,TransactionCardProps } from "../../components/TransactionCard";
import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,    
} from './styles'

export interface DataListProps extends TransactionCardProps{
    id: string;    
}

 
export function Dashboard(){
    const data: DataListProps[]  = [{
        id: '1',
        type: 'positive',
        title: "Desenvolvimento de Site",
        amount: "R$ 12.000,00",
        category: {name: 'vendas',icon: 'dollar-sign'},
        date: "13/01/2022"
    },
    {  
        id: '2',
        type: 'negative',
        title: "Hamburgueria Pizzy",
        amount: "R$ 59,00",
        category: {name: 'Alimentação',icon: 'coffee'},
        date: "13/01/2022"
    },
    {   
        id: '3',
        type: 'negative',
        title: "Aluguem Apê",
        amount: "R$ 1.200,00",
        category: {name: 'Casa',icon: 'shopping-bag'},
        date: "13/01/2022"
    },

]
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri: 'https://avatars.githubusercontent.com/u/79926888?v=4'}}/>
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>Dionatan</UserName>
                        </User>
                    </UserInfo>  
                    <Icon name="power"/>                          
                </UserWrapper>                               
            </Header>
            
            <HighlightCards>
                <HighlightCard type="up" title="Entradas" amount="R$ 17.400,00" lastTransaction="Ultima entrada dia 9 de janeiro"/>
                <HighlightCard type="down" title="Saidas" amount="R$ 1.259,00" lastTransaction="Ultima saida dia 10 de janeiro"/>
                <HighlightCard type="total" title="Total" amount="R$ 16.141,00" lastTransaction="01 à 16 de janeiro"/>
            </HighlightCards>
            
            <Transactions>
                <Title>Listagem</Title>
                
                <TransactionList                                       
                    data={data}                                    
                    renderItem={({item})=> <TransactionCard data={item} />}
                />
                
            </Transactions>

        </Container>
    )
}

