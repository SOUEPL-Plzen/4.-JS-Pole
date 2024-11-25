// Pole obsahující dostupné komponenty v nabídce
const nabidka = ["CPU", "GPU", "RAM"]; 
// Prázdné pole, které bude reprezentovat uživatelský košík
const kosik = [];

// Funkce pro výpis prvků pole do HTML elementu
function vypis(array, output) {
    // Vymažeme obsah HTML elementu určeného pro výpis
    document.getElementById(output).innerHTML = "";
    // Projdeme všechny prvky pole
    for (let i = 0; i < array.length; i++) {
        // Každý prvek přidáme jako text na novou řádku v HTML elementu
        document.getElementById(output).innerHTML += i + 1 + ". " + array[i] + "<br>";
    }
}

// Funkce pro přidání komponenty z nabídky do košíku
function Add() {
    // Získáme hodnotu z textového vstupua
    const input = document.getElementById("add-component");
    // HTML elementy pro nabídku a košík (pro aktualizaci)
    const content = document.getElementById("content");
    const user_cart = document.getElementById("user-cart");

    // Zkontrolujeme, zda vstup odpovídá platné hodnotě
    if ((input.value <= nabidka.length) && (input.value > 0) && (!isNaN(input.value))) {
        // Přidáme vybranou komponentu do košíku
        kosik.push(nabidka[input.value - 1]);  
        // Odstraníme tuto komponentu z nabídky
        nabidka.splice(input.value - 1, 1);
    } else {
        // Pokud je vstup neplatný, zobrazíme chybovou hlášku
        alert("Chyba");
    }
    // Aktualizujeme výpisy a možnosti košíku
    vypis(kosik, "user-cart");
    vypis(nabidka, "content");
    updateKosikOptions();
}

// Funkce pro aktualizaci možností v rozbalovacím seznamu (select)
function updateKosikOptions() { 
    // Najdeme HTML element typu select
    const select = document.getElementById("kosik-nabidka"); 
    // Vymažeme jeho aktuální obsah
    select.innerHTML = ""; 
    
    // Projdeme všechny položky v košíku
    for (let i = 0; i < kosik.length; i++) { 
        // 1. Vytvoříme nový prvek <option> pomocí příkazu createElement, do vnitř píšeme název elementu bez <>
        let option = document.createElement("option"); 
        // 2. Nastavíme hodnotu a zobrazovaný text, hodnota je zde atriput <option value="1"></option>
        option.value = i + 1; 
        option.text = kosik[i]; // Můžete použít i innerHTML, ale text je kratší, element pak vypadá jíž takto <option value="1">Nazev produktu z košíku</option>
        // 3. Přidáme <option> do <select>, jednodušeji si select element adptuje potomka, kterého jsme vytvořili
        select.appendChild(option); 
    } 
} 

// Funkce pro odebrání komponenty z košíku zpět do nabídky
function Odeber() { 
    // Najdeme aktuálně vybraný index v rozbalovacím seznamu
    const select = document.getElementById("kosik-nabidka"); 
    const index = select.selectedIndex; // Funkce odkazuje na zvolený index, k tomu nám pomáhají atributy v option value.
    
    console.log("index = ", index); // Debugging informace

    // Pokud je index validní (existuje vybraný prvek)
    if (index >= 0) { 
        // Přidáme zpět do nabídky komponentu z košíku
        nabidka.push(kosik[index]); 
        // Odebereme tuto komponentu z košíku
        kosik.splice(index, 1); 
        // Aktualizujeme možnosti v rozbalovacím seznamu
        updateKosikOptions(); 
    } else { 
        // Pokud není vybrán žádný prvek, zobrazíme chybu
        alert("Chyba");
    } 
    // Aktualizujeme výpisy pro košík a nabídku
    vypis(kosik, "user-cart"); 
    vypis(nabidka, "content");

    // Debugging informace pro kontrolu polí
    console.log(nabidka);
    console.log(kosik);
}

// Na začátku stránky vypíšeme dostupné komponenty z nabídky
vypis(nabidka, "content");
