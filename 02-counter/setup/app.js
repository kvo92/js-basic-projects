// set initial count
let count = 0;

// select values and buttons 
// id -> #
const value = document.querySelector("#value");
// class -> .
const btns = document.querySelectorAll('.btn');

btns.forEach((btn)=>{
        btn.addEventListener('click', (e) => {
                //console.log(e);
                styles = e.currentTarget.classList;
                if(styles.contains('decrease')){
                        count--;
                } 
                else if(styles.contains('increase')){
                        count++;
                }
                else if(styles.contains('reset')){
                        count = 0;
                }
                if(count > 0){
                        value.style.color = "green";
                }
                if(count < 0){
                        value.style.color = "red";
                }
                if(count === 0){
                        value.style.color = "black";
                }
                value.textContent = count;                
        });        
})