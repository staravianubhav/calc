import { Component } from '@angular/core';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {stack
  title = 'Calculator';
  one:number = 1;
  two = 2;
  three = 3;
  four = 4;
  five = 5;
  six = 6;
  seven = 7;
  eight = 8;
  nine = 9;
  zero = 0;
  exp:any = '';
  str = [];
  top = -1;
  postfix =[];
  result;
  val;
  ch;
  x=0;
  i=0;

    /** calculator ctor */
    constructor() {
       
  }
  

  cos(exp) {
    console.log(exp);
    this.val=this.eval(exp);
     return this.exp= Math.cos(parseFloat(this.val));
  }

  sin(exp) {
    console.log(exp);
    this.val=this.eval(exp);
     return this.exp= Math.sin(parseFloat(exp));
  }

  tan(exp) {
    console.log(exp);
    this.val=this.eval(exp);
     return this.exp= Math.tan(parseFloat(exp));
  }

  log(exp) {
    console.log(exp);
    this.val = this.eval(exp);
    return this.exp= Math.log(parseFloat(exp));
  }

  sqrt(exp) {
    console.log(exp);
    this.val = this.eval(exp);
    return this.exp= Math.sqrt(parseFloat(exp));
  }
  calcC(){
    this.exp = '';
    this.str = [];
    this.postfix = [];
    return this.exp;
  }

  calc(ex: string[]) {
    //this.exp = '';
    this.exp =this.exp+ ex;
 
    // for(this.i=0;this.i<this.exp.length;this.i++)
      console.log(this.exp);

  }

  push(elem) {
    this.str.push(elem);
    this.top++;
  }

  pop() {
    this.top--;
    return this.str.splice(-1,1)[0];

  }

  isdigit(ch) {
    // for (var i = 0; i < this.exp.length; i++) {
      //var ch = this.exp.charAt(i);
      if (ch > 48 || ch < 57 ) {
        // if (ch != "/" && ch != "*" && ch != "+" && ch != "-" && ch != "."
        //   && ch != "(" && ch!= ")" && ch != "%" && ch != "\n") {
        //  // alert("invalid entry!")
          return true
        //   }
        }
  //}
      return false
  }
  
  infix_to_postfix(expr: string[]) {
    this.ch; 
    this.x=0;
    this.i = 0;
    //let k = 0;

    this.push('#');
    console.log('expression'+expr);
    while((this.ch = expr[this.i++]) != '@')
    {
     
   if (this.isdigit(this.ch))
     {
      //console.log(ch.charCodeAt(0)); 
      
      this.x = this.x + (this.ch.charCodeAt(0)-48);
      
      console.log(this.x);
       this.x=this.x*10;
      console.log(this.x);
        //  this.postfix.push(ch);
        //  k++;
     }
     if(!this.isdigit(this.ch))
        {
             this.x=this.x/10;
             console.log(this.x);
             this.postfix.push(this.x);
             console.log('postfix[]'+this.postfix);
             //k++;
             //console.log('k='+k);             
             this.x=0;
            if (this.ch == '(')
            {
                this.push(this.ch);
             }
           else if (this.ch == ')')
          {
             while (this.str[this.top] != '(') 
                {
                  //k++;
                  this.postfix.push(this.pop());
                }
              this.pop(); /* Remove ( */
          } else /* Operator */
              { 
              while (this.presidence(this.str[this.top]) >= this.presidence(this.ch))
               {
                 //k++; 
                 this.postfix.push(this.pop());
                 console.log('str'+this.str);
                }if(this.ch!='$'){
                  this.push(this.ch);
                  console.log('str='+this.str);
                }
                
              }
       }
    }
     while (this.str[this.top] != '#') /* Pop from stack till empty */
     {
       this.postfix.push(this.pop());
       //k++;
     }
    // this.postfix[k] = 0; /* Make postfix as valid string */
    //this.pop();
    this.pop();
    this.top = -1;
    console.log('top'+this.top);
    this.postfix = this.postfix.concat('@');
    return this.postfix;
    
  }
  

  presidence(elem) { 
    switch (elem) {
    case '$':
    return 0;
    case '#':
    return -1;
    case '(':
    return 1;
    case '+':
    case '-':
    return 2;
    case '*':
    case '/':
    return 3;
    }
   }

   
   
   eval_postfix(postfix) {
    let ch;
    let i = 0, op1, op2, op3;
    console.log(postfix);
    while((ch = postfix[i++]) != '@') {
      if(this.isdigit(ch)) {
        console.log(ch);
        this.push(ch); /* Push the operand */

        //console.log('finlSTR'+this.str);
      }
      
    else { /* Operator,pop two operands */
      console.log(ch);
      op2 = parseFloat(this.pop());
      console.log('op2='+op2);
      op1 = parseFloat(this.pop());
      console.log('op1='+op1);
      switch(ch) {
        case '+' :  //op3 = (op1 ) + (op2);
                    this.push(op1 + op2); 
        break;
        case '-' :  op3 = (op1) - (op2);
                    this.push(op3); 
        break;
        case '*' :  op3 = (op1)*(op2);
                    this.push(op3);
        break;
        case '/' :  op3 = (op1)/(op2);
                    this.push(op3);
        break;
      }
      }
    }
    console.log('finalStr'+this.str);
    return parseFloat(this.str[this.top]);
   }

   eval(exp) {
    exp = exp.concat('$@');
    console.log('expressionConcat'+exp);
    let expression = this.infix_to_postfix(exp);
    console.log('expPostfix'+expression);
    
     this.exp = this.eval_postfix(expression);
     exp = parseFloat(exp);
     console.log('result'+this.result);
     this.postfix = [];
     console.log('postfixEmpty'+ this.postfix);
     this.str = [];
     console.log('strEmpty'+ this.str);
     this.top = -1;
     return this.exp;
   }
} 


