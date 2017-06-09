import React, {Component} from 'react';
import $ from 'jquery';


class NewExpense extends Component{

    newExpense(e){

        if(this.refs.name.value === ""){
            alert("Name Required");
        }else{
            if(this.refs.cost.value === ""){
                alert("Cost Required");
            }else{
                if(this.refs.purchase_date.value === ""){
                    alert("Date Required");
                }else{
                    let expense = {"name" : this.refs.name.value,"cost" : this.refs.cost.value,"purchase_date" : this.refs.purchase_date.value};
                    this.refs.name.value= "";
                    this.refs.cost.value = "";
                    this.refs.purchase_date.value="";
                    this.addExpense(expense);
                }
            }
        }


        e.preventDefault()
    }

    addExpense(expense){
        $.ajax({
        url : "http://127.0.0.1:5000/api/expenses/",
        dataType : 'json',
        cache : false,
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data : JSON.stringify(expense),
        success : function(data){
            if(data.result){
                alert("New Expense Added");
          }else{
            alert(data.error);
          }
        },
        error : function(xhr, status, err){
          console.log(err);
        },
      });
    }

    render(){
        return(
            <div className="NewExpense text-center">
                <form onSubmit={this.newExpense.bind(this)} className="form-inline">
                    <input className="form-control" type="text" placeholder="name" ref="name"/>
                    <input className="form-control" type="number" min="0.01" max="999.99" step="0.01" placeholder="cost" ref="cost"/>
                    <input className="form-control" type="date" ref="purchase_date"/>
                    <button className="form-control btn btn-success" type="submit"><span className="glyphicon glyphicon-plus-sign"></span>&nbsp;Add Expense</button>
                </form>
            </div>
        );
    }
}


export default NewExpense;
