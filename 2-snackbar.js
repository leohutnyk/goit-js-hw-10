import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i}from"./assets/vendor-BbbuE1sJ.js";const r=document.querySelector(".form");i.info({title:"Hello",message:"Welcome!"});r.addEventListener("submit",t=>{t.preventDefault();const e=Number(r.elements.delay.value),o=r.elements.state.value;if(e<=0||isNaN(e)){i.error({message:"Delay must be a positive number!"});return}m(e,o).then(s=>i.success({message:`Fulfilled promise in ${s}ms`})).catch(s=>i.error({message:`Rejected promise in ${e}ms`})),r.reset()});function m(t,e){return new Promise((o,s)=>{setTimeout(()=>{e==="fulfilled"?o(t):s(t)},t)})}
//# sourceMappingURL=2-snackbar.js.map