import React from 'react'; 
import copy from 'copy-to-clipboard';
import Header from './header';
import HTMLtoJSX from '@erikwithuhk/html-to-jsx';  
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightBright } from 'react-syntax-highlighter/dist/esm/styles/hljs'; 

const sampleHTML = '<!-- Created by Vishnu Baliga --> <div class="awesome" style="border: 1px solid red"> <label for="name">Enter your name: </label> <input type="text" id="name" /> </div> <p>Enter your HTML here</p>';



export default class Convertor extends React.Component{
    constructor(){
        super();
        this.state = {
            convertedData:'',
            rawData:'',
            loading: false,
            copying:false,
            error:false,
            output: false
        }
        this.inputRef = React.createRef(); 
    }

    insertSample = (e) =>{ 
          this.setState({
                rawData: sampleHTML,
                    convertedData:'', 
                    loading: false,
                    copying:false,
                    error:false,
                    output: false,
                    createClass: false
            });
    }
 
      handleCopy = (value) => {
            copy(value); 
        this.setState({
                copying:true,
            })
        setTimeout(()=>{
            this.setState({
                copying:false,
            })
        },500);
    }
    handleChange = (e) =>{  
    
        const {createClass} = this.state;
        const rawData = this.inputRef.current.value;

            this.setState({
                rawData
            });    
        if(rawData){

            this.setState({
                loading: true,
                error:false,
            });    


            
            const converter = new HTMLtoJSX({
                createClass,
                outputClassName: 'YourComponent'
            });
            
            setTimeout(()=>{
                this.setState({ 
                    convertedData: converter.convert(rawData), 
                    loading: false,
                    output: true
                });   
            },500); 
                

        }
        else{ 
               this.setState({
                    convertedData:'',
                    rawData:'',
                    loading: false,
                    copying:false,
                    error:false,
                    output: false
                    }); 
        }

    } 
    createClass = (e) =>{ 
        this.setState({
            createClass: e.target.checked
        });    
    }

    render()
    {
        const {convertedData,loading, rawData,copying,error, output} = this.state;
        return(
            <>

    <Header />

          
 
                <div className="input-container">
                    <a className="sample-input" onClick={e=>this.insertSample(e)}>{`Click here to insert Sample HTML`}</a>
                    <h2>Input <small><strong>HTML</strong></small></h2>
                    <textarea placeholder={'Paste your HTML here..'} value={rawData} ref={this.inputRef} onChange={(e)=>this.handleChange(e) } rows={'10'}  /><br/>
                    

                    <div className="checkbox-wrapper">
                        <center>
                            <input name="createClass" id="createClass" type="checkbox" onChange={e=>this.createClass(e)} /> 
                            <label for="createClass">Create as React Class Component</label>  
                        </center>
                    </div>


                    <button type={'submit'} disabled={!rawData|loading} onClick={this.handleChange}>{loading?'Converting...':'Convert HTML to JSX'}</button> 
                </div> 

                {output && rawData &&
                        <div className={(error) ? 'error output-container':'output-container'}>
                            <h2>Output <small><strong>JSX</strong></small></h2>
                            {!error && rawData && convertedData && <button onClick={e=>this.handleCopy(`${convertedData}`)}>{copying?'Copied!':'Copy Code'}</button> } 
                            
                            <SyntaxHighlighter style={tomorrowNightBright}>
                                {convertedData}
                            </SyntaxHighlighter>   
                        </div>
                }

           
  

            </>
        )
    }
}
