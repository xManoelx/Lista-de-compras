class ShoppingList {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        this.loadItems();
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        const addBtn = document.getElementById('addBtn');
        const itemInput = document.getElementById('itemInput');
        const clearCompleted = document.getElementById('clearCompleted');

        addBtn.addEventListener('click', () => this.addItem());
        itemInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addItem();
            }
        });
        clearCompleted.addEventListener('click', () => this.clearCompleted());
    }

    addItem() {
        const input = document.getElementById('itemInput');
        const text = input.value.trim();
        
        if (text === '') {
            alert('Por favor, digite um item válido!');
            return;
        }

        const item = {
            id: Date.now(),
            text: text,
            completed: false
        };

        this.items.push(item);
        input.value = '';
        this.saveItems();
        this.render();
        input.focus();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveItems();
        this.render();
    }

    toggleItem(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.completed = !item.completed;
            this.saveItems();
            this.render();
        }
    }

    clearCompleted() {
        this.items = this.items.filter(item => !item.completed);
        this.saveItems();
        this.render();
    }

    render() {
        const list = document.getElementById('shoppingList');
        const emptyState = document.getElementById('emptyState');
        const totalItems = document.getElementById('totalItems');
        const completedItems = document.getElementById('completedItems');
        const clearCompletedBtn = document.getElementById('clearCompleted');

        // Atualizar estatísticas
        const total = this.items.length;
        const completed = this.items.filter(item => item.completed).length;
        
        totalItems.textContent = total;
        completedItems.textContent = completed;
        
        // Mostrar/esconder botão de limpar concluídos
        clearCompletedBtn.style.display = completed > 0 ? 'block' : 'none';

        // Mostrar/esconder estado vazio
        if (this.items.length === 0) {
            emptyState.style.display = 'block';
            list.style.display = 'none';
            return;
        }

        emptyState.style.display = 'none';
        list.style.display = 'block';

        // Renderizar itens
        list.innerHTML = '';
        this.items.forEach(item => {
            const li = document.createElement('li');
            li.className = `list-item ${item.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <input type="checkbox" class="item-checkbox" ${item.completed ? 'checked' : ''}>
                <span class="item-text">${this.escapeHtml(item.text)}</span>
                <button class="delete-btn">×</button>
            `;

            // Eventos
            const checkbox = li.querySelector('.item-checkbox');
            const deleteBtn = li.querySelector('.delete-btn');

            checkbox.addEventListener('change', () => this.toggleItem(item.id));
            deleteBtn.addEventListener('click', () => {
                this.removeItem(item.id);
            });

            list.appendChild(li);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveItems() {
        // Simular salvamento (em um app real, seria no localStorage ou servidor)
        // localStorage.setItem('shoppingList', JSON.stringify(this.items));
    }

    loadItems() {
        // Simular carregamento (em um app real, seria do localStorage ou servidor)
        // const saved = localStorage.getItem('shoppingList');
        // if (saved) {
        //     this.items = JSON.parse(saved);
        // }
    }
}

// Inicializar o app
document.addEventListener('DOMContentLoaded', () => {
    new ShoppingList();
});