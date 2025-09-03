let nameField = document.getElementById('nameField');
let priceField = document.getElementById('priceField');
let countField = document.getElementById('countField');
let addBtn = document.getElementById('addBtn');
let itemsList = document.getElementById('itemsList');
let sumLbl = document.getElementById('sumLbl');
let vallist = document.getElementById('miujsag');


let items=[];

let dolgok=[];

addBtn.addEventListener('click', ()=>{
    if (nameField.value == '' || priceField.value == 0 || countField.value == 0){
        window.alert('Nincs adat')
        return;
    }
    items.push({
        name:nameField.value,
        price:Number(priceField.value),
        count:Number(countField.value),
        sum:priceField.value * countField.value
    })
    dolgok.push({
        name:nameField.value
    })
    refreshTable();
    clearForm();
    save();
});
nameField.addEventListener('selectionchange', (item)=>{
    
})

function clearForm(){
    nameField.value ='';
    priceField.value='';
    countField.value='';

    dolgok=[];
}

function refreshTable(){
    itemsList.innerHTML='';
    let sum=0;
    for (let z = 0; z < dolgok.length; z++) {
        let valas = document.createElement('option');
        valas.value=dolgok[z].name;
        vallist.appendChild(valas);
    }
    
    
    for (let i = 0; i < items.length; i++) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');
        let btn= document.createElement('button');



        td1.innerHTML= i+1 + '.';
        td2.innerHTML= items[i].name;
        td3.innerHTML= items[i].price + ' Ft';
        td4.innerHTML= items[i].count + ' db';
        td5.innerHTML= items[i].sum + ' Ft';
        btn.innerHTML="x";
        
        td3.classList.add('text-end');
        td4.classList.add('text-end');
        td5.classList.add('text-end');
        btn.classList.add('btn','btn-danger','btn-sm');

        btn.addEventListener('click', ()=>{deleteItem(i);});

        sum += items[i].sum;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        td6.appendChild(btn);



        itemsList.appendChild(tr);
    }

    sumLbl.innerHTML = sum;
}

function deleteItem(idx){
    if (confirm('Biztosan törlöd a tételt')) {
        items.splice(idx,1)
        refreshTable();
        save();
    }
}

function save(){
    localStorage.setItem('bevLista', JSON.stringify(items))
    localStorage.setItem('nevek', JSON.stringify(dolgok))

}

function load(){
   if (localStorage.getItem('bevLista')){
        items = JSON.parse(localStorage.getItem('bevLista'));
    }
}

load();
refreshTable();
clearForm();