function btnOnclick(){
    let input = document.getElementById("hoTen").value;
    input = input.trim(); 
    if(input=="")
        alert("Vui Lòng nhập tên");
    else{
        let arr = input.split(/\s+/);
        let chuanHoa = arr.map(e =>{
            let lower = e.toLowerCase();
            return lower.charAt(0).toUpperCase()+ lower.slice(1);
        })
        let output = document.getElementById("output");
        output.innerHTML = chuanHoa.join(" ");
    }

}
let btn = document.getElementById("btn-dieuchinh");
btn.addEventListener("click", btnOnclick);