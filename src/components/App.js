import React, { Component } from 'react'
import axios from 'axios'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import Speech from './Speech'
// import ImageViewer from './ImageViewer'
// import VideoViewer from './VideoViewer'
import ReactPlayer from 'react-player'
// import YouTube from 'react-youtube'
import './App.css'
// process.env.REACT_APP_API_KEY

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listening: false,
      toggleListen_onClick: 0,
      query: '',
      search: '',
      result: '',
      imageUrlContainer: [],
      videoUrlContainer: [],
      currentPage: 1
    }

    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  toggleListen() {
    this.setState({
      listening: !this.state.listening,
      toggleListen_onClick: this.state.toggleListen_onClick + 1,
      query: this.state.listening ? this.state.query : '',
    }, this.handleListen)
  }

  handleListen() {
    console.log('listening?', this.state.listening, this.state.toggleListen_onClick)

    if (this.state.listening) {
      recognition.start()
      recognition.onend = () => {
        console.log('...continue listening...')
        recognition.start()
      }
    } else {
      recognition.stop()
      recognition.onend = () => {
        console.log('Stopped listening per click')
      }
    }

    recognition.onstart = () => {
      console.log('Listening!')
    }

    let finalTranscript = ''
    recognition.onresult = event => {
      let interimTranscript = ''


      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript

        if (event.results[i].isFinal) finalTranscript += transcript + ' '
        else interimTranscript += transcript
      }

      document.getElementById('interim').innerHTML = interimTranscript
      document.getElementById('final').innerHTML = finalTranscript

      const transcriptArr = finalTranscript.split(' ')
      const stopCmd = transcriptArr.slice(-3, -1)
      console.log('stopCmd', stopCmd)

      if (stopCmd[0] === `let's` && stopCmd[1] === `go`) {
        recognition.stop()
        recognition.onend = () => {
          console.log('Stopped listening per command')

          const finalText = transcriptArr.slice(0, -3).join(' ')
          document.getElementById('final').innerHTML = finalText

          this.setState({
            query: finalText.toString(),
            listening: !this.state.listening,
            currentPage: 1
          })
          console.log("let's go? then check state", this.state.query, 'listening?', this.state.listening, 'currentPage?', this.state.currentPage)
        }
      }

      if (stopCmd[0] === `try` && stopCmd[1] === `again`) {
        recognition.stop()
        recognition.onend = () => {
          console.log('Stopped listening per command')

          const finalText = transcriptArr.slice(0, -3).join(' ')
          document.getElementById('final').innerHTML = finalText

          this.setState({
            query: '',
            listening: !this.state.listening
          })
          console.log("try again? then check state", this.state.query, 'listening?', this.state.listening)
        }
      }

      // if (this.state.toggleListen_onClick % 2 === 0) {
      //   recognition.stop()
      //   recognition.onend = () => {
      //     console.log('Stopped listening per click')

      //     this.setState({
      //       query: transcriptArr.toString(),
      //       listening: !this.state.listening
      //     })
      //     console.log(this.state.query, 'listening?', this.state.listening)
      //   }
      // }
    }

    recognition.onerror = event => {
      console.log('Error occurred in recognition: ' + event.error)
    }
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value
    })
  }
  handleSearchSubmit = (event) => {
    this.setState({
      query: this.state.search,
      currentPage: 1
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
    console.log('check state of currentPage when Increase', this.state.currentPage)
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
    console.log('check state of currentPage when decrease',this.state.currentPage)
  }

  componentDidUpdate(prevProps, prevState) {
    let query = prevState.query
    let prevQuery = this.state.query.replace(/(\s*)/g,'')
    let resultQuery = this.state.query.toString()
    let listening = prevState.listening
    console.log('componentDidUpdate', query, listening,this.state.currentPage)

    const CSE_KEY = process.env.REACT_APP_API_KEY

    // let tunnedImageRequset = 'https://www.googleapis.com/customsearch/v1?q=' + prevQuery + '&cx=005285766285205858251%3Age6j54qcp19&exactTerms=cute&excludeTerms=free%2C%20shopify%2C%20shirt%2C%20tattoo%2C%20reddit%2C%20pinterest%2C%20drawing%2C%20crazy&filter=1&hl=en&imgSize=huge&imgType=clipart&safe=high&searchType=image&key=' + CSE_KEY

    let tunnedVideoRequset = 'https://www.googleapis.com/customsearch/v1?q=' + prevQuery + '&cx=005285766285205858251%3Age6j54qcp19&orTerms=cartoon&dateRestrict=m15&excludeTerms=kill%2C%20killed%2C%20horror%2C%20Gazoon%2C%20doll%2C%20gbm%2C%20toy%2C%20news%2C%20draw%2C%20diy%2C%20tutorial%2C%20remix%2C%20dead%2C%20die%2C%20threat%2C%20drown%2C%20war%2C%20hindi%2C%20manga%2C%20twitch%2C%20crazy%2C%20bangla%2C%20islamic%2C%20arabic%2C%20isthishowyougoviral%2C%20larva%2C%20parody%2C%20Kannan&filter=1&gl=us&hl=en&rights=cc_publicdomain%2C%20cc_noncommercial&safe=high&siteSearch=youtube.com&siteSearchFilter=i&key=' + CSE_KEY

    if (!prevQuery) {
      return;
    }

    // axios.get(tunnedImageRequset)
    // .then(responseOfTunnedImageRequset => {
    //   console.log('image',responseOfTunnedImageRequset.data.items)
    //   this.setState({
    //     imageUrlContainer: responseOfTunnedImageRequset.data.items,
    //     query: '',
    //     result: resultQuery
    //   })
    // })

    axios.get(tunnedVideoRequset)
    .then(responseOfTunnedVideoRequset => {
      console.log('video',responseOfTunnedVideoRequset.data.items, this.state.query)
      this.setState({
        videoUrlContainer: responseOfTunnedVideoRequset.data.items,
        query: '',
        result: resultQuery
      })
    })
  }

  render() {
    // const opts = {
    //   width: '800',
    //   height: '480',
    //   playerVars: {
    //     autoplay: 1
    //   }
    // }

    return (
      <div className='App'>
        <header className='App-header'>
          <span>
            <form className='language_selection' onSubmit={this.handleLanguageSubmit}>
              <label className='language_selection_label'>
                <select name="language" value={this.state.language} onChange={this.handleLanguage}>
                  <option value="en-US">English</option>
                  <option value="ko-KR">Korean</option>
                </select>
              </label>
              <input className='language_selection_submit' type="submit" value="Go" />
            </form>

            <form className='orTerms_selection' action='/' method='get' >
              <label className='orTerms_selection_label'>
                <select name="orTerms">
                  <option value="">None</option>
                  <option value="cartoon">Cartoon</option>
                  <option value="baby">Baby</option>
                  <option value="lovely">Lovely</option>
                </select>
              </label>
              <input className='orTerms_selection_submit' type="submit" value="Go" />
            </form>

            <div className='speechRecognition'>
              <div className='speechRecognition-container'>
                <span>
                  <div className='speechRecognition-container-name'>
                    {/* {
                      this.state.listening
                      ?
                      !this.state.result? `I'm Listening!` : this.state.result
                      :
                      'My First Words'
                    } */}
                    {
                      this.state.listening
                      ?
                      <div>
                        <div id='interim'></div>
                        <div id='final'></div>
                      </div>
                      :
                      this.state.result ? this.state.result : 'My First Words'
                    }
                  </div> {/* 단어가 바뀌어야 하는데 삼항연산자로 한번 해보자 */}
                  <button className='microphone-button' onClick={this.toggleListen}>🎙</button>
                  {/* <div id='interim'></div>
                  <div id='final'></div> */}
                </span>
              </div>
            </div>

            <div className='searchBar'>
              <form className='searchBar_input' onSubmit={this.handleSearchSubmit}>
                <input className='input_text'
                  type='text'
                  value={this.state.search}
                  placeholder="Search by Text!!"
                  onChange={this.handleSearch}
                />
                <input className='input_submit'
                  type="submit"
                  value="Go"
                />
                {/* <div>{this.state.search}</div> */}
              </form>
            </div>
          </span>

          {/* <div className='searchBar'>
            <form className='form' action='/' method='get' >
              <div className='answer'>
                <label className='label'>My First Words
                  <br/>
                  <br/>
                  <input type='text' name='query' placeholder="Enter Baby's First Words!! ie.Elephant" required />
                </label>
                <br/>
                <br/>
                <button className='search-button' type='submit'>Let's go!!</button>
              </div>
            </form>
          </div> */}
        </header>

        <main>
          {/* <div className='speechRecognition'>
            <div className='speechRecognition-container'>
              <span>
              <div className='speechRecognition-container-name'>My First Words</div>
              <button className='microphone-button' onClick={this.toggleListen}>🎙</button>
              </span>
              <div className='microphone-status'>
                {
                  this.state.listening
                  ?
                  `I'm Listening!`
                  :
                  "Not Listening now!\nIf you want to turn on mic press the button above."
                }
              </div>
              <br/>
              <div id='interim'></div>
              <div id='final'></div>
              <div>query: {this.state.query}</div>
              <div>result: {this.state.result}</div>
            </div>
          </div>

          <br/>
          <br/>
          <br/>

          <div className='imageViewer'>
            <div className='image-json'>Image-json
              {
                this.state.imageUrlContainer && this.state.imageUrlContainer.length
                ?
                this.state.imageUrlContainer.map((list, index) => {
                  return (
                    <div className='image-json-list-container' key={index}>
                      <div>{index + 1}. {list.link}</div>
                      <img src={list.link} width='300px' alt='image_url_by_cse'/>
                    </div>
                  )
                })
                :
                'No?'
              }
            </div>
          </div>

          <br/>
          <br/>
          <br/> */}

          <div className='videoViewer'>
            <div className='video-json'>
              {
                this.state.videoUrlContainer.length
                ?
                <div className='video-json-list-container'>Videos
                  {/* <div>{this.state.videoUrlContainer[this.state.currentPage - 1].link}</div>
                  'https://www.youtube.com/watch?v=stcNMMIEYxU'

                  <div>name: {this.state.videoUrlContainer[this.state.currentPage - 1].title}</div>
                  'Baby Shark Song Challenge + More Nursery Rhymes & Kids Songs ...'

                  <div>description: {this.state.videoUrlContainer[this.state.currentPage - 1].snippet}</div>
                  'Baby Shark Song Challenge + More Nursery Rhymes & Kids Songs | Sharks Cartoon Baby Shark Cartoon For Children Channel ! Subscribe to SHARK FAMILY ...' */}
                  <div className='thumbnail_container'>
                    <button className='video-json-thumbnail' onClick={this.handleReactPlayer1}>
                      <img className='video-json-thumbnail'
                        src={this.state.videoUrlContainer[0].pagemap.cse_image[0].src}
                        width='330px'
                        height='186px'
                        alt='thumbnail_image'
                        key='1'
                      />
                      <div className='video-json-thumbnail-title'>
                        1. {this.state.videoUrlContainer[0].title}
                      </div>
                    </button>

                    <button className='video-json-thumbnail' onClick={this.handleReactPlayer2}>
                      <img className='video-json-thumbnail'
                        src={this.state.videoUrlContainer[1].pagemap.cse_image[0].src}
                        width='330px'
                        height='186px'
                        alt='thumbnail_image'
                        key='2'
                      />
                      <div className='video-json-thumbnail-title'>
                        2. {this.state.videoUrlContainer[1].title}
                      </div>
                    </button>

                    <button className='video-json-thumbnail' onClick={this.handleReactPlayer3}>
                      <img className='video-json-thumbnail'
                        src={this.state.videoUrlContainer[2].pagemap.cse_image[0].src}
                        width='330px'
                        height='186px'
                        alt='thumbnail_image'
                        key='3'
                      />
                      <div className='video-json-thumbnail-title'>
                        3. {this.state.videoUrlContainer[2].title}
                      </div>
                    </button>

                    <button className='video-json-thumbnail' onClick={this.handleReactPlayer4}>
                      <img className='video-json-thumbnail'
                        src={this.state.videoUrlContainer[3].pagemap.cse_image[0].src}
                        width='330px'
                        height='186px'
                        alt='thumbnail_image'
                        key='4'
                      />
                      <div className='video-json-thumbnail-title'>
                        4. {this.state.videoUrlContainer[3].title}
                      </div>
                    </button>

                    <button className='video-json-thumbnail' onClick={this.handleReactPlayer5}>
                      <img className='video-json-thumbnail'
                        src={this.state.videoUrlContainer[4].pagemap.cse_image[0].src}
                        width='330px'
                        height='186px'
                        alt='thumbnail_image'
                        key='5'
                      />
                      <div className='video-json-thumbnail-title'>
                        5. {this.state.videoUrlContainer[4].title}
                      </div>
                    </button>

                    <button className='video-json-thumbnail' onClick={this.handleReactPlayer6}>
                      <img className='video-json-thumbnail'
                        src={this.state.videoUrlContainer[5].pagemap.cse_image[0].src}
                        width='330px'
                        height='186px'
                        alt='thumbnail_image'
                        key='6'
                      />
                      <div className='video-json-thumbnail-title'>
                        6. {this.state.videoUrlContainer[5].title}
                      </div>
                    </button>

                    <button className='video-json-thumbnail' onClick={this.handleReactPlayer7}>
                      <img className='video-json-thumbnail'
                        src={this.state.videoUrlContainer[6].pagemap.cse_image[0].src}
                        width='330px'
                        height='186px'
                        alt='thumbnail_image'
                        key='7'
                      />
                      <div className='video-json-thumbnail-title'>
                        7. {this.state.videoUrlContainer[6].title}
                      </div>
                    </button>

                    <button className='video-json-thumbnail' onClick={this.handleReactPlayer8}>
                      <img className='video-json-thumbnail'
                        src={this.state.videoUrlContainer[7].pagemap.cse_image[0].src}
                        width='330px'
                        height='186px'
                        alt='thumbnail_image'
                        key='8'
                      />
                      <div className='video-json-thumbnail-title'>
                        8. {this.state.videoUrlContainer[7].title}
                      </div>
                    </button>

                    <button className='video-json-thumbnail' onClick={this.handleReactPlayer9}>
                      <img className='video-json-thumbnail'
                        src={this.state.videoUrlContainer[8].pagemap.cse_image[0].src}
                        width='330px'
                        height='186px'
                        alt='thumbnail_image'
                        key='9'
                      />
                      <div className='video-json-thumbnail-title'>
                        9. {this.state.videoUrlContainer[8].title}
                      </div>
                    </button>

                    <button className='video-json-thumbnail' onClick={this.handleReactPlayer10}>
                      <img className='video-json-thumbnail'
                        src={this.state.videoUrlContainer[9].pagemap.cse_image[0].src}
                        width='330px'
                        height='186px'
                        alt='thumbnail_image'
                        key='10'
                      />
                      <div className='video-json-thumbnail-title'>
                        10. {this.state.videoUrlContainer[9].title}
                      </div>
                    </button>

                    {/* {
                      this.state.videoUrlContainer.map((list, index) => {
                        return (
                          <button className='video-json-thumbnail' onClick={this.handleReactPlayer} key={index}>
                            <img className='video-json-thumbnail'
                              src={list.pagemap.cse_image[0].src}
                              width='330px'
                              height='186px'
                              alt='thumbnail_image'
                              key={index}
                            />
                          </button>
                        )
                      })
                    } */}

                    {/* {
                      this.state.imageUrlContainer.map((list, index) => {
                        return (
                          // <button className='video-json-thumbnail' onClick={this.handleReactPlayer} key={index}>
                            <img className='video-json-thumbnail'
                              src={list.link}
                              width='330px'
                              alt='thumbnail_image'
                              key={index}
                            />
                          // </button>
                        )
                      })
                    } */}
                  </div>

                  <ReactPlayer
                    url={this.state.videoUrlContainer[this.state.currentPage - 1].link}
                    // url='https://www.youtube.com/watch?v=stcNMMIEYxU'
                    playing
                    width='960px'
                    height='540px'
                  />

                  <div className='pageNation'>
                    <span>
                      <button className='prevBtn' onClick={this.handleDecrease}>Prev</button>
                      <div className='currentPage'>{this.state.currentPage} / {this.state.videoUrlContainer.length}</div>
                      <button className='nextBtn' onClick={this.handleIncrease}>Next</button>
                    </span>
                    {/* <div>전체 동영상수: {this.state.videoUrlContainer.length}</div> */}
                  </div>

                  {/* <YouTube
                    videoId={this.state.videoUrlContainer[this.state.currentPage - 1].link.substr(this.state.videoUrlContainer[this.state.currentPage - 1].link.length - 11, 11)}
                    opts={opts}
                  /> */}
                </div>
                :
                ''
              }
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App
