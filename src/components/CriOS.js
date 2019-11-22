import React, { Component } from "react"
import axios from "axios"
import ReactPlayer from "react-player"
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listening: false,
      query: "",
      search: "",
      result: "",
      interimTranscriptRecog: "",
      finalTranscriptRecog: "",
      imageUrlContainer: [],
      videoUrlContainer: [],
      currentPage: 1,
      language: "en-US",
      orTerms: "cartoon",
      placeholder: "Search by Text"
    }
  }

  handleLanguageChange = (event) => {
    this.setState({
      language: event.target.value
    });
  }
  handleLanguageSubmit = (event) => {
    event.preventDefault();
  }

  handleOrTermsChange = (event) => {
    this.setState({
      orTerms: event.target.value
    });
  }
  handleOrTermsSubmit = (event) => {
    event.preventDefault();
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value
    })
  }
  handleSearchSubmit = (event) => {
    this.setState({
      query: this.state.search,
      result: this.state.search,
      currentPage: 1,
      interimTranscriptRecog: "",
      finalTranscriptRecog: "",
      placeholder: "Search by Text"
    })
    event.preventDefault();
  }

  handleReactPlayer1 = () => {
    this.setState({
      currentPage: 1
    });
  }
  handleReactPlayer2 = () => {
    this.setState({
      currentPage: 2
    });
  }
  handleReactPlayer3 = () => {
    this.setState({
      currentPage: 3
    });
  }
  handleReactPlayer4 = () => {
    this.setState({
      currentPage: 4
    });
  }
  handleReactPlayer5 = () => {
    this.setState({
      currentPage: 5
    });
  }
  handleReactPlayer6 = () => {
    this.setState({
      currentPage: 6
    });
  }
  handleReactPlayer7 = () => {
    this.setState({
      currentPage: 7
    });
  }
  handleReactPlayer8 = () => {
    this.setState({
      currentPage: 8
    });
  }
  handleReactPlayer9 = () => {
    this.setState({
      currentPage: 9
    });
  }
  handleReactPlayer10 = () => {
    this.setState({
      currentPage: 10
    });
  }

  handleIncrease = () => {
    if (this.state.currentPage === 10) {
      this.setState({
        currentPage: 10
      });
    } else {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  }

  handleDecrease = () => {
    if (this.state.currentPage === 1) {
      this.setState({
        currentPage: 1
      });
    } else {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = this.state.query.replace(/(\s*)/g,"")
    const CSE_KEY = process.env.REACT_APP_API_KEY
    const orTermsSelect = this.state.orTerms
    const tunnedVideoRequest = "https://www.googleapis.com/customsearch/v1?q=" + prevQuery + "&cx=005285766285205858251%3Age6j54qcp19&orTerms=" + orTermsSelect + "&dateRestrict=m15&excludeTerms=kill%2C%20killed%2C%20horror%2C%20Gazoon%2C%20doll%2C%20gbm%2C%20toy%2C%20news%2C%20draw%2C%20diy%2C%20tutorial%2C%20remix%2C%20dead%2C%20die%2C%20threat%2C%20drown%2C%20war%2C%20hindi%2C%20manga%2C%20twitch%2C%20crazy%2C%20bangla%2C%20islamic%2C%20arabic%2C%20isthishowyougoviral%2C%20larva%2C%20parody%2C%20Kannan&filter=1&gl=us&hl=en&rights=cc_publicdomain%2C%20cc_noncommercial&safe=high&siteSearch=youtube.com&siteSearchFilter=i&key=" + CSE_KEY

    if (!prevQuery) {
      return;
    }

    axios.get(tunnedVideoRequest)
    .then(responseOfTunnedVideoRequest => {
      this.setState({
        videoUrlContainer: responseOfTunnedVideoRequest.data.items,
        query: "",
      })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="speechRecognition">
            <div className="speechRecognition-container">
              <div className="speechRecognition-container-name">
                {
                  this.state.listening
                  ?
                  this.state.interimTranscriptRecog || this.state.finalTranscriptRecog ?
                  <div>
                    <div id="interim"></div>
                    <div id="final"></div>
                  </div>
                  : <div className="listening">i'm listening...</div>
                  :
                  this.state.query || this.state.result ? this.state.result : "My First Words 👶"
                }
              </div>
              <button className="microphone-button" onClick={this.toggleListen}>Search by Voice 🎙</button>
            </div>
          </div>

          <form className="language_selection" onSubmit={this.handleLanguageSubmit}>
            <label className="language_selection_label">Language
              <select name="language" value={this.state.language} onChange={this.handleLanguageChange}>
                <option value="en-US">English</option>
                <option value="ko-KR">Korean</option>
              </select>
            </label>
          </form>

          <form className="orTerms_selection" onSubmit={this.handleOrTermsSubmit}>
            <label className="orTerms_selection_label">orTerms
              <select name="orTerms" value={this.state.orTerms} onChange={this.handleOrTermsChange}>
                <option value="cartoon">Cartoon</option>
                <option value="baby">Baby</option>
                <option value="lovely">Lovely</option>
                <option value="">None</option>
              </select>
            </label>
          </form>

          <div className="searchBar">
            <form className="searchBar_input" onSubmit={this.handleSearchSubmit}>
              <input className="input_text"
                type="text"
                value={this.state.search}
                placeholder={this.state.placeholder}
                onChange={this.handleSearch}
              />
              <input className="input_submit"
                type="submit"
                value="Go"
              />
            </form>
          </div>
        </header>

        <main>
          <div className="videoViewer">
            <div className="video-json">
              {
                this.state.videoUrlContainer.length
                ?
                <div className="video-json-list-container">
                  <div className="thumbnail_container">
                    <button className="video-json-thumbnail" onClick={this.handleReactPlayer1}>
                      <img className="video-json-thumbnail"
                        src={this.state.videoUrlContainer[0].pagemap.cse_image[0].src}
                        width="330px"
                        height="186px"
                        alt="thumbnail_image"
                        key="1"
                      />
                      <div className="video-json-thumbnail-title">
                        1. {this.state.videoUrlContainer[0].title}
                      </div>
                    </button>

                    <button className="video-json-thumbnail" onClick={this.handleReactPlayer2}>
                      <img className="video-json-thumbnail"
                        src={this.state.videoUrlContainer[1].pagemap.cse_image[0].src}
                        width="330px"
                        height="186px"
                        alt="thumbnail_image"
                        key="2"
                      />
                      <div className="video-json-thumbnail-title">
                        2. {this.state.videoUrlContainer[1].title}
                      </div>
                    </button>

                    <button className="video-json-thumbnail" onClick={this.handleReactPlayer3}>
                      <img className="video-json-thumbnail"
                        src={this.state.videoUrlContainer[2].pagemap.cse_image[0].src}
                        width="330px"
                        height="186px"
                        alt="thumbnail_image"
                        key="3"
                      />
                      <div className="video-json-thumbnail-title">
                        3. {this.state.videoUrlContainer[2].title}
                      </div>
                    </button>

                    <button className="video-json-thumbnail" onClick={this.handleReactPlayer4}>
                      <img className="video-json-thumbnail"
                        src={this.state.videoUrlContainer[3].pagemap.cse_image[0].src}
                        width="330px"
                        height="186px"
                        alt="thumbnail_image"
                        key="4"
                      />
                      <div className="video-json-thumbnail-title">
                        4. {this.state.videoUrlContainer[3].title}
                      </div>
                    </button>

                    <button className="video-json-thumbnail" onClick={this.handleReactPlayer5}>
                      <img className="video-json-thumbnail"
                        src={this.state.videoUrlContainer[4].pagemap.cse_image[0].src}
                        width="330px"
                        height="186px"
                        alt="thumbnail_image"
                        key="5"
                      />
                      <div className="video-json-thumbnail-title">
                        5. {this.state.videoUrlContainer[4].title}
                      </div>
                    </button>

                    <button className="video-json-thumbnail" onClick={this.handleReactPlayer6}>
                      <img className="video-json-thumbnail"
                        src={this.state.videoUrlContainer[5].pagemap.cse_image[0].src}
                        width="330px"
                        height="186px"
                        alt="thumbnail_image"
                        key="6"
                      />
                      <div className="video-json-thumbnail-title">
                        6. {this.state.videoUrlContainer[5].title}
                      </div>
                    </button>

                    <button className="video-json-thumbnail" onClick={this.handleReactPlayer7}>
                      <img className="video-json-thumbnail"
                        src={this.state.videoUrlContainer[6].pagemap.cse_image[0].src}
                        width="330px"
                        height="186px"
                        alt="thumbnail_image"
                        key="7"
                      />
                      <div className="video-json-thumbnail-title">
                        7. {this.state.videoUrlContainer[6].title}
                      </div>
                    </button>

                    <button className="video-json-thumbnail" onClick={this.handleReactPlayer8}>
                      <img className="video-json-thumbnail"
                        src={this.state.videoUrlContainer[7].pagemap.cse_image[0].src}
                        width="330px"
                        height="186px"
                        alt="thumbnail_image"
                        key="8"
                      />
                      <div className="video-json-thumbnail-title">
                        8. {this.state.videoUrlContainer[7].title}
                      </div>
                    </button>

                    <button className="video-json-thumbnail" onClick={this.handleReactPlayer9}>
                      <img className="video-json-thumbnail"
                        src={this.state.videoUrlContainer[8].pagemap.cse_image[0].src}
                        width="330px"
                        height="186px"
                        alt="thumbnail_image"
                        key="9"
                      />
                      <div className="video-json-thumbnail-title">
                        9. {this.state.videoUrlContainer[8].title}
                      </div>
                    </button>

                    <button className="video-json-thumbnail" onClick={this.handleReactPlayer10}>
                      <img className="video-json-thumbnail"
                        src={this.state.videoUrlContainer[9].pagemap.cse_image[0].src}
                        width="330px"
                        height="186px"
                        alt="thumbnail_image"
                        key="10"
                      />
                      <div className="video-json-thumbnail-title">
                        10. {this.state.videoUrlContainer[9].title}
                      </div>
                    </button>
                  </div>

                  <ReactPlayer
                    url={this.state.videoUrlContainer[this.state.currentPage - 1].link}
                    playing
                    loop
                    width="960px"
                    height="540px"
                  />

                  <div className="pageNation">
                    <span>
                      <button className="prevBtn" onClick={this.handleDecrease}>Prev</button>
                      <div className="currentPage">{this.state.currentPage} / {this.state.videoUrlContainer.length}</div>
                      <button className="nextBtn" onClick={this.handleIncrease}>Next</button>
                    </span>
                  </div>
                </div>
                :
                <div className="tutorial">
                  <div className="thumbnail_container">
                    <div>You can search Words by</div>
                    <li className="first">Voices</li>
                    <li className="second">Texts</li>

                    <div>When using Voices</div>
                    <div>To execute searching</div>
                    <li className="first">Say in English "Let's Go"</li>
                    <li className="second">or in Korean "보여 주세요"</li>
                    <div>To cancel searching</div>
                    <li className="first">Say in English "Try Again"</li>
                    <li className="second">or in Korean "다시 다시"</li>

                    <div>And also you can choose</div>
                    <li className="first">Language</li>
                    <li className="second">orTerms</li>

                    <div className="note">orTerms are additional search terms to filter your result.</div>
                  </div>

                  <div className="main_container">
                    <div>Welcome to My First Words.</div>
                    <br/>
                    <div>This is the streaming services for Babies!!</div>
                    <li>actually, to help hard-babysitting parents. <span role="img" aria-label="hard">🙀😱</span></li>
                    <br/>
                    <div>After search, you can see related Youtube Videos.</div>
                    <br/>
                    <div>I hope you enjoy watching with your Baby. <span role="img" aria-label="parent">👨‍👩‍👧</span></div>
                    <br/>
                    <div><span role="img" aria-label="words">🐣🐱🐯🦁🐨🐷🐰🐶🐼🐮🐵🐙🐢🐬🐳🦕✈️🚆🛥🚘🚌🚑</span></div>
                  </div>
                </div>
              }
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App
