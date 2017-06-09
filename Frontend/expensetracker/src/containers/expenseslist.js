import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {expensesRefresh} from '../actions/index';
import $ from 'jquery';
import ExpenseItem from './expenseitem';


class ExpenseList extends Component{


    componentDidMount(){
        setInterval(()=>this.refreshData(), 3000);
    }

    refreshData(){
        // console.log("Refreshing Data...")
        const baseUrl = "http://127.0.0.1:5000/api";
        $.ajax({
                url : baseUrl+'/expenses/',
                dataType : 'json',
                cache : false,
                method: 'get',
                success : function(data){
                  if(data.result){
                    this.handleData(data.result);
                  }else{
                    this.handleData(data.error);
                  }
                }.bind(this),
                error : function(xhr, status, err){
                  console.log(err);
                },
              });
    }

    handleData(data){
        // console.log("Handling Result");
        this.props.expensesRefresh(data);
    }

    getExpenseItems(){
        return this.props.items.map(item => {
            return( <ExpenseItem key={item.id} item={item} />);
        });
    }

    render(){
        if (this.props.items){
            return(
                <div className="ExpensesList row">
                {this.getExpenseItems()}
                </div>
            );
        }else{
            return (<div className="ExpensesList">
                    <h2>Loading Expenses...</h2>
                    </div>
                    );
        }
    }
}

function mapStateToProps(state){
    return {
        items : state.items
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({expensesRefresh : expensesRefresh},dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ExpenseList);
