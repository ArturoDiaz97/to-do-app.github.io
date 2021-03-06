import { removeItemsAndGenerateItemsSorted } from "./remove-template-todo.js";
import { updateTotalLeftItems } from "./total-left-items.js";

export function setListenersToItemsCheckboxes(d, listaAll, listaCompleted, listaActivos, totalItemsActive, descriptionContainer){
    d.addEventListener("click", (e) => {
        if (e.target.className == "checkbox-item") {
            let textItemContainer = e.target.parentNode.parentNode.parentNode.lastChild.firstChild.firstChild;
            setTodoCompleted(textItemContainer.id, listaAll, listaCompleted ,listaActivos, totalItemsActive, descriptionContainer)
            if (e.target.checked) {
                textItemContainer.style.textDecorationLine = "line-through";
            }else{
                textItemContainer.style.textDecorationLine = "none";
            }
        }
    })
}

function setTodoCompleted(itemID, listaAll, listaCompleted, listaActivos, totalItemsActive, descriptionContainer){
    let items = JSON.parse(localStorage.getItem("allItemsTODO"));
    items.find(item => {
        if (item.id == itemID) {
            if(item.estado == 1){
                item.estado = 2;
            }else{
                item.estado = 1;
            }
            removeItemsAndGenerateItemsSorted(listaAll, items, 1);
            removeItemsAndGenerateItemsSorted(listaActivos, items, 2);
            removeItemsAndGenerateItemsSorted(listaCompleted, items, 3);
        }
    })
    localStorage.setItem("allItemsTODO", JSON.stringify(items));
    updateTotalLeftItems(totalItemsActive, items, descriptionContainer);
}