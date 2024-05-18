document.addEventListener('DOMContentLoaded', () => {
    const tabela = document.getElementById('estoqueTable').getElementsByTagName('tbody')[0];
    const form = document.getElementById('produtoForm');
    const idInput = document.getElementById('id');
    const nomeInput = document.getElementById('nome');
    const categoriaInput = document.getElementById('categoria');
    const precoCustoInput = document.getElementById('precoCusto');
    const valorInput = document.getElementById('valor');
    const quantidadeInput = document.getElementById('quantidade');

    const modal = document.getElementById('produtoModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.querySelector('.modal .close');

    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const produto = {
            id: idInput.value,
            nome: nomeInput.value,
            categoria: categoriaInput.value,
            precoCusto: parseFloat(precoCustoInput.value),
            valor: parseFloat(valorInput.value),
            quantidade: parseInt(quantidadeInput.value)
        };

        adicionarProduto(produto);
        form.reset();
        modal.style.display = 'none';
    });

    const adicionarProduto = (produto) => {
        const row = tabela.insertRow();

        const cellId = row.insertCell(0);
        const cellNome = row.insertCell(1);
        const cellCategoria = row.insertCell(2);
        const cellPrecoCusto = row.insertCell(3);
        const cellValor = row.insertCell(4);
        const cellQuantidade = row.insertCell(5);
        const cellStatus = row.insertCell(6);
        const cellAcao = row.insertCell(7);

        cellId.textContent = produto.id;
        cellNome.textContent = produto.nome;
        cellCategoria.textContent = produto.categoria;
        cellPrecoCusto.textContent = `R$ ${produto.precoCusto.toFixed(2)}`;
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

