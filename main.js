class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.history = [];

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'lotto-generator');

    const title = document.createElement('h1');
    title.textContent = 'Lotto Number Generator';

    const numberDisplay = document.createElement('div');
    numberDisplay.setAttribute('class', 'number-display');

    const button = document.createElement('button');
    button.textContent = 'Generate Numbers';

    const historyContainer = document.createElement('div');
    historyContainer.setAttribute('class', 'history');
    const historyTitle = document.createElement('h2');
    historyTitle.textContent = 'History';
    historyContainer.appendChild(historyTitle);

    button.addEventListener('click', () => {
      const numbers = this.generateNumbers();
      this.displayNumbers(numbers, numberDisplay);
      this.updateHistory(numbers, historyContainer);
    });

    const style = document.createElement('style');
    style.textContent = `
      .lotto-generator {
        text-align: center;
        background-color: var(--white);
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: var(--primary-color);
        font-weight: 600;
        margin-bottom: 20px;
      }

      .number-display {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-bottom: 30px;
      }

      .number-ball {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: var(--secondary-color);
        color: var(--text-color);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-weight: 600;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
      }

      .number-ball:hover {
        transform: scale(1.1);
      }

      button {
        background-color: var(--primary-color);
        color: var(--white);
        border: none;
        padding: 15px 30px;
        font-size: 18px;
        font-weight: 600;
        border-radius: 10px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
      }

      button:hover {
        background-color: #45a049;
      }

      .history {
        margin-top: 40px;
      }

      .history h2 {
        color: var(--primary-color);
        font-weight: 600;
        margin-bottom: 20px;
      }

      .history-item {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(title);
    wrapper.appendChild(numberDisplay);
    wrapper.appendChild(button);
    wrapper.appendChild(historyContainer);
  }

  generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers);
  }

  displayNumbers(numbers, container) {
    container.innerHTML = '';
    numbers.forEach(number => {
      const ball = document.createElement('div');
      ball.setAttribute('class', 'number-ball');
      ball.textContent = number;
      container.appendChild(ball);
    });
  }

  updateHistory(numbers, container) {
    const historyItem = document.createElement('div');
    historyItem.setAttribute('class', 'history-item');
    historyItem.textContent = numbers.join(', ');
    container.appendChild(historyItem);
    this.history.push(numbers);
  }
}

customElements.define('lotto-generator', LottoGenerator);
