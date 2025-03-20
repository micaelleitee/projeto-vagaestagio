const form = document.getElementById("form")
const productList = document.getElementById("product-list")
let produts = JSON.parse(localStorage.getItem("produtos")) || []

function sortProductsByPrice() {
  produts.sort((a, b) => parseFloat(a.input_valor) - parseFloat(b.input_valor))
}

function renderProducts() {
  sortProductsByPrice()

  if (produts.length === 0) {
    productList.innerHTML = `
      <tr class="no-products">
        <td colspan="5">Nenhum produto listado.</td>
      </tr>
    `
    return
  }
  productList.innerHTML = produts
    .map((produto, index) => {
      return `
        <tr>
          <td>${produto.name_produto}</td>
          <td>${produto.desc_produto}</td>
          <td>R$ ${produto.input_valor}</td>
          <td>${produto.disp_venda === "1" ? "Sim" : "Não"}</td>
          <td>
            <button onclick="deleteProduct(${index})" id="button-delete">Excluir</button>
          </td>
        </tr>
      `
    })
    .join("")
}

form.addEventListener("submit", function (event) {
  event.preventDefault()
  const name_produto = document.getElementById("text-produto").value
  const desc_produto = document.getElementById("desc-produto").value
  const input_valor = document.getElementById("input-valor").value
  const disp_venda = document.getElementById("selection-options").value
  produts.push({ name_produto, desc_produto, input_valor, disp_venda })
  localStorage.setItem("produtos", JSON.stringify(produts))

  renderProducts()

  form.reset()
})

function deleteProduct(index) {
  produts.splice(index, 1)
  localStorage.setItem("produtos", JSON.stringify(produts))
  renderProducts()
}
renderProducts()
