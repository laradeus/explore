// Define lista de objetos, um para cada região
let dados = [
  {
    "regiao": "São Paulo",
    "idh": 77.8,
    "esperancavida": 76.8,
    "gini": 43,
    "mortalidade": 13.78,
    "analfabetismo": 38.7,
    "superior": 14.98

  },
  {
    "regiao": "Centro",
    "idh": 81.7,
    "esperancavida": 78.6,
    "gini": 47,
    "mortalidade": 10.18,
    "analfabetismo": 25.5,
    "superior": 23.83
  },
  {
    "regiao": "Zona Leste",
    "idh": 75.6,
    "esperancavida": 75.5,
    "gini": 42, 
    "mortalidade": 14.61,
    "analfabetismo": 38.7,
    "superior": 11.0
  },
  {
    "regiao": "Zona Norte",
    "idh": 77.8,
    "esperancavida": 76.5,
    "gini": 43,
    "mortalidade": 13.09,
    "analfabetismo": 36.1,
    "superior": 14.96
  },
  {
    "regiao": "Zona Oeste",
    "idh": 81.6,
    "esperancavida": 77.7,
    "gini": 46,
    "mortalidade": 11.55,
    "analfabetismo": 35.7,
    "superior": 28.46
  },
  {
    "regiao": "Zona Sul",
    "idh": 76.3,
    "esperancavida": 75.8,
    "gini": 42,
    "mortalidade": 14.24,
    "analfabetismo": 42.2,
    "superior": 14.65
  }
]

// Seleciona a <ul> da página, para inserirmos os gráficos ela
let lista = document.querySelector( 'ul' )

// Cria elementos para o gráfico
for ( let dado of dados ) {

  // Cria elemento pai (<li>)
  let item = document.createElement( 'li' )

  // Cria elementos filhos (<span>)
  let rotulo = document.createElement( 'span' )
  let barra = document.createElement( 'span' )
  let percentual = document.createElement( 'span' )
  
  // Adiciona texto ao elemento
  rotulo.textContent = dado.regiao

  // Adiciona classes para aplicar CSS e selecionar via JS
  rotulo.classList.add( 'rotulo' )
  barra.classList.add( 'barra' )
  percentual.classList.add( 'percentual' )

  // Insere os elementos na página
  item.append( rotulo )
  item.append( barra )
  item.append( percentual )

  lista.append( item )

}

// Seleciona todas as <li> da página
let itens = document.querySelectorAll( 'li' )

// Seleciona o elemento <select>
let seletor = document.querySelector( 'select' )

// Quando a opção do seletor mudar, dispara uma funcão
seletor.addEventListener( 'change', redimensionaBarras )

// Define a função que muda o comprimento das barras
function redimensionaBarras() {

  // Identifica o atributo que a pessoa selecionou
  let atributo = seletor.value
  
  // Para cada região…
  for ( let dado of dados ) {

    // Guarde a região atual
    let regiao = dado.regiao

    // Para cada <li>…
    for ( let item of itens ) {

      // Selecione seu respectivo elemento com nome da região
      let rotulo = item.querySelector( '.rotulo' )

      // Se o texto desse elemento for igual ao da região que está nos meus dados
      if ( rotulo.textContent == regiao ) {
        
        // Seleciona os respectivos elementos .barra e .percentual
        let barra = item.querySelector( '.barra' )
        let percentual = item.querySelector( '.percentual' )
        let explicacao = item.querySelector(".explicacao")

        // Guarda o valor dado.atributo, dependendo da opção selecionada
        let valor = dado[ atributo ]

        // Calcula o comprimento para as barras (o valor 4 é arbitrário)
        let largura = valor * 4
        
        // Aplica o comprimento à barra
        barra.style.width = largura + 'px' 
        
        if (atributo == "mortalidade") {

          // Adiciona o percentual, como texto, no caso de "mortalidade" selecionada
          percentual.textContent = valor + '%'
          
          // Adiciona o percentual, como texto, no caso de "superior" selecionada
        } else if (atributo == "superior") {
          percentual.textContent = valor + '%'

          // Transforma o valor de 0 a 100 (colocado para criar uma barra proporcional) no correto valor

        } else if (atributo == "idh"){
          percentual.textContent = valor*10
          
          // Transforma o valor de 0 a 100 (colocado para criar uma barra proporcional) no correto valor

        } else if (atributo =="gini") {

          percentual.textContent = valor/100

          // Transforma o valor de 0 a 100 (colocado para criar uma barra maior) no correto valor
        }else if (atributo =="analfabetismo"){
          percentual.textContent = (valor/10).toFixed(2) + "%"
     
        } else {

          percentual.textContent = valor + " anos"
          

        }

      }

    }

  }

}



// Desenha o gráfico assim que a página for carregada
redimensionaBarras()