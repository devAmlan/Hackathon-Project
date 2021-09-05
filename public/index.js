function getSkill(){
 let selectcategory = document.getElementById('selectcategory')
 const skill = selectcategory.options[selectcategory.selectedIndex].value
 const category = document.getElementsByTagName('H5')
 Array.from(category).forEach(skills=>{
//  console.log(skills.innerHTML)
if(skill == skills.innerHTML){
  skills.parentElement.style.display = 'flex'
}
if(skill != skills.innerHTML){
  skills.parentElement.style.display = 'none'
}
})

}
