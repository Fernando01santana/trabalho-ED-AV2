class BinaryTree {
    // inicializa a raiz como nula
    constructor() {
        this.root = null
    }

    //exibe o menor valor da arvore
    /* 
        a variavel current recebe o valor da varivel root
        se current for igual a null ira retornar -1 porque na tem valor ali dentro ou entao retorna null
        caso contrario entra dentro do laço 
        enquanto o valor da equerda for diferente de null current recebe current.left
        quando o valor da esquerda for igual a null encerra o while e current tem o valor mais baixo
    */
    min() {
        let current = this.root
        if (current == null)
            return null
        while (current.left != null)
            current = current.left
        return current.content
    }

    //exibe o maior valor da arvore
     /* 
        a variavel current recebe o valor da varivel root
        se current for igual a null ira retornar -1 porque nao tem valor ali dentro ou entao retorna null
        caso contrario entra dentro do laço 
        enquanto o valor da direita for diferente de null current recebe current.left
        quando o valor da direita for igual a null encerra o while e current tem o valor mais alto
    */
    max() {
        let current = this.root
        if (current == null)
            return null
        while (current.right != null)
            current = current.right
        return current.content
    }

    //insere o elemento da arvores
    insert(element) { //recebe uma referencia do no 
        this.root = this.insertNode(this.root, element)
        //retorna uma referencia do no
    }
    //comentadio-------------------------------
    //IMPLEMENTANDO O INSERT DA ARVORE
    /*recebe uma referencia e insere o no
      *ele verifica se esta nulu e insere
      *verifica se e maior que a raiz
      *se for ele insere na direta
      *se nao ele insere a esquerda
    */
    insertNode(rootNode, element) {
        if (rootNode == null)
            return new Node(element)
        if (element > rootNode.content)
            rootNode.right = this.insertNode(rootNode.right, element)
        else
            rootNode.left = this.insertNode(rootNode.left, element)
        return rootNode
    }

    //executa a função callback para cada nó, em ordem
    //a funcao recebe um callback
    inOrderTraverse(callback) {
        this.inOrderVisitor(this.root, callback)
    }
    //comentadio-------------------------------

    /*verifica se o no e nulo
     *se for nao returna nada
     *caso contrario manda mostrar em ordem
     *esqueda,conteudo e direita do no
    */
    inOrderVisitor(node, callback) {
        if (node == null)
            return
        this.inOrderVisitor(node.left, callback)
        callback(node.content)
        this.inOrderVisitor(node.right, callback)
    }

    //executa a função callback para cada nó, em pré-ordem
    preOrderTraverse(callback) {
        this.preOrderVisitor(this.root, callback)
    }
    //recebe o no e o callback 
    /*
        se o no for nullo nao retorne nada
        se nao passe o conteudo do no dentro do callback
        e depois mostre a esquerda do no
        e emseguida a direita do no
    */ 
    preOrderVisitor(node, callback) {
        if (node == null)
            return
        callback(node.content)
        this.preOrderVisitor(node.left, callback)
        this.preOrderVisitor(node.right, callback)
    }

    //executa a função callback para cada nó, em pós-ordem
    
    postOrderTraverse(callback) {
        this.postOrderVisitor(this.root, callback)
    }
    //pos ordem recebe o metodo e a função
    /* 
        se o no for nullo nao retorne nada
        se nao passe o conteudo do no dentro do callback
        e depois mostre a esquerda do no
        e emseguida a direita do no
    */
    postOrderVisitor(node, callback) {
        if (node == null)
            return
        this.postOrderVisitor(node.left, callback)
        this.postOrderVisitor(node.right, callback)
        callback(node.content)
    }

    //retorna true se o valor já existe na arvore 
    //     Busca na árvore binária
    //    1. É nulo? o elemento não existe
    //    2. É igual ao conteúdo? achou
    //    3. É maior que o conteúdo?
    //       3.1 busca de direita
    //       3.2 busca na esquerda

    search(value) {
        return this.searchVisitor(this.root, value)
    }

    searchVisitor(node, element) {
        if (node == null)
            return false
        if (node.content == element)
            return true;
        if (element > node.content)
            return this.searchVisitor(node.right, element)
        else
            return this.searchVisitor(node.left, element)
    }

    //remove um elemento existente na arvore o retorna
    //manda remover e retorna a arvore atualizada
    remove(value) {
        this.root = this.removeVisitor(this.root, value)
    }
    /* 
        se o valor do no for igual ao valor
        entra dentro do segundo if
        se o lado esquerdo for igual ao lado direito retorna null
        se o lado direito for nulo retorna o lado esquerdo
        se o lado esquerdo for igual a null retorna o lado direito
        e se nao atender nenhum das condições anterioores:
            o novo no recebe o valor do lado direito
            o current tambem recebe o mesmo valor
            se o valor do lado esquerdo for diferemte de null
                current recebe o valor do lado esquerdo
                e retorna o novo no
        se o valor de content nao for igual a value
        e value for maior que o valor do no entra dentro do if
        e o valor a esquerda e removido
        caso contrario o valor da direita e removido
        e entao retorna o no        

    */
    removeVisitor(node, value) {
        if (node.content == value) {
            if (node.left == node.right) {
                //nao tem filhos - Grau 0
                return null
            } else if (node.right == null) {
                //não tem filhos na direita, e tem nó na esqueda - Grau 1
                return node.left
            } else if (node.left == null) {
                //não tem filhos da esquerda, e tem nó da direita - Grau 1
                return node.right
            } else {
                // tem os dois ramos - Grau 2
                const newRoot = node.right
                let current = node.right;
                while (current.left != null)
                    current = current.left
                current.left = node.left
                return newRoot;
            }
        } else if (value < node.content) {
            node.left = this.removeVisitor(node.left, value)
        } else {
            node.right = this.removeVisitor(node.right, value)
        }
        return node;
    }

    //exibe a altura da arvore
    height() {
        return this.heightVisitor(this.root)
    }
    /*recebe um no e por padrao e nulo
        se o no nao for null retorna -1
        leftHeight = verificar o tamanho da altura da esquerda
        rightHeight = verifica o tamanho da altura da direita
        retorna a variavel que tiver o maior valor + 1 que e a contagem do outro no
    */
    heightVisitor(node) {
        if (!node)
            return -1
        let leftHeight = this.heightVisitor(node.left),
            rightHeight = this.heightVisitor(node.right)
        return Math.max(leftHeight, rightHeight) + 1
    }

    // informa quantos nós existem na arvore
    //retorna o tamamho apartir daraiz
    size() {

        return this.sizeVisitor(this.root)
    }
/* 
 se nao tiver no
 retorna 0
 se tiver
retorna o tamanho do no da esquerda mas o tamanho do no da direita e o resultado somado 1
*/
    sizeVisitor(node) {
        if (!node)
            return 0
        return this.sizeVisitor(node.left) + this.sizeVisitor(node.right) + 1
    }
}
