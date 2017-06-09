import React, {Component} from 'react';
import $ from 'jquery';


class ExpenseItem extends Component{


    deleteExpense(){
        $.ajax({
        url : "http://127.0.0.1:5000/api/expenses/"+this.props.item.id+'/',
        dataType : 'json',
        cache : false,
        type: 'DELETE',
        success : function(data){
            if(data.result){
            alert("Expense Deleted");
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
        if (this.props.item){
            return(
                <div className="ExpenseItem col-md-3 col-lg-3">
                    <ul>
                        <li><strong>Name</strong> : {this.props.item.name}</li>
                        <li><strong>Cost</strong> : {this.props.item.cost}</li>
                        <li><strong>Purchase Date</strong> : {this.props.item.purchase_date}</li>
                    </ul>
                    <button onClick={this.deleteExpense.bind(this)} className="btn btn-small btn-danger">Delete</button>
                </div>
            );
        }
    }
}


export default ExpenseItem;
