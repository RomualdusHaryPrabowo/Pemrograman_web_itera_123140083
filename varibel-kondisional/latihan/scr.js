//Hanya tampil pada console browser

var nama = "Romualdus"
let asal = "Indonesia"
const umur = 60

// mengecek kategori umur dengan ternary operator
let kategori_umur = ""
18 <= umur && umur <= 59 ? kategori_umur = "Dewasa" :"Lansia"
12 < umur && umur <= 17 ? kategori_umur = "Remaja" : "Anak - anak"
umur >= 60 ? kategori_umur = "Lansia" : ""

console.log(`nama : ${nama}`)
console.log(`asal : ${asal}`)
console.log(`Status : ${kategori_umur}`)

// mengecek hari dengan switch case
let hari = 5
switch (hari) {
    case 1:
        console.log("Senin")
        break;  
    case 2:
        console.log("Selasa")
    case 3:
        console.log("Rabu")
        break;
    case 4:
        console.log("Kamis")
        break;
    case 5:
        console.log("Jumat")
        break; 
    case 6:
        console.log("Sabtu")
        break;
    case 7:
        console.log("Minggu")
        break;
}

