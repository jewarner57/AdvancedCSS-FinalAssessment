class TickerTape extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // Make a new span element
    this._tapeText = document.createElement('h1')
    this._shadowRoot.appendChild(this._tapeText)

    // Get the text in the original tag and put it in the span element
    this._tapeText.innerHTML = this.innerHTML

    this._tapeText.style.textAlign = 'center'

    this._delay = 100
  }


  // Tell this component it should look for changes to time
  static get observedAttributes() {
    // Add observed attributes here
    return ['delay'];
  }


  // Handle changes to attributes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'delay') {
      this._delay = parseInt(newValue) // set the delay
    }
  }

  disconnectedCallback() {
    this._clearTimer()
  }

  connectedCallback() {
    this._addTimer()
  }


  _addTimer() {
    this._timer = setInterval(() => {

      const currentText = this._tapeText.innerHTML
      const newText = currentText.substring(currentText.length - 1) + currentText.substring(0, currentText.length - 1)
      this._tapeText.innerHTML = newText

    }, this._delay);
  }


  _clearTimer() {
    console.log('clear', this._time)
    clearInterval(this._timer)
  }
}

customElements.define('ticker-tape', TickerTape);

