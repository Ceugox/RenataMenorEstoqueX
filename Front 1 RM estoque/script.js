document.addEventListener('DOMContentLoaded', () => {
    const tabela = document.getElementById('estoqueTable').getElementsByTagName('tbody')[0];
    const form = document.getElementById('produtoForm');
    const nomeInput = document.getElementById('nome');
    const valorInput = document.getElementById('valor');
    const quantidadeInput = document.getElementById('quantidade');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const produto = {
            nome: nomeInput.value,
            valor: parseFloat(valorInput.value),
            quantidade: parseInt(quantidadeInput.value)
        };

        adicionarProduto(produto);
        form.reset();
    });

    const adicionarProduto = (produto) => {
        const row = tabela.insertRow();

        const cellNome = row.insertCell(0);
        const cellValor = row.insertCell(1);
        const cellQuantidade = row.insertCell(2);
        const cellStatus = row.insertCell(3);
        const cellAcao = row.insertCell(4);

        cellNome.textContent = produto.nome;
        cellValor.textContent = `R$ ${produto.valor.toFixed(2)}`;
        cellQuantidade.textContent = produto.quantidade;
        atualizarStatus(cellQuantidade, cellStatus);

        const entradaBtn = document.createElement('button');
        entradaBtn.textContent = 'Dar Entrada';
        entradaBtn.classList.add('entrada-btn');
        entradaBtn.addEventListener('click', () => {
            produto.quantidade += 1;
            cellQuantidade.textContent = produto.quantidade;
            atualizarStatus(cellQuantidade, cellStatus);
        });

        const saidaBtn = document.createElement('button');
        saidaBtn.textContent = 'Dar Saída';
        saidaBtn.classList.add('saida-btn');
        saidaBtn.addEventListener('click', () => {
            if (produto.quantidade > 0) {
                produto.quantidade -= 1;
                cellQuantidade.textContent = produto.quantidade;
                atualizarStatus(cellQuantidade, cellStatus);
            }
        });

        const excluirBtn = document.createElement('button');
        excluirBtn.textContent = 'Excluir';
        excluirBtn.classList.add('excluir-btn');
        excluirBtn.addEventListener('click', () => {
            tabela.deleteRow(row.rowIndex - 1);
        });

        cellAcao.appendChild(entradaBtn);
        cellAcao.appendChild(saidaBtn);
        cellAcao.appendChild(excluirBtn);
    };

    const atualizarStatus = (cellQuantidade, cellStatus) => {
        if (parseInt(cellQuantidade.textContent) > 0) {
            cellStatus.textContent = 'Disponível';
            cellStatus.classList.add('available');
            cellStatus.classList.remove('unavailable');
        } else {
            cellStatus.textContent = 'Indisponível';
            cellStatus.classList.add('unavailable');
            cellStatus.classList.remove('available');
        }
    };
});
