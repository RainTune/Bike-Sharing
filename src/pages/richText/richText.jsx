import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import {Card, Button, Modal} from "antd";
export default class Editor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // 创建一个空的editorState作为初始值
            editorState: BraftEditor.createEditorState(null),
            showRichText: false
        };
    }
    componentDidMount () {
    }
    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    };
    getContent() {
        this.setState({
            showRichText: true
        })
    }
    render () {
        const { editorState } = this.state;
        return (
            <div>
                <Card className={'card-wrap'}>
                    <Button type = 'warning'>清空</Button>
                    <Button type = 'primary' onClick = {() => this.getContent()}>获取HTML内容</Button>
                </Card>
                <Card>
                    <BraftEditor
                        value={editorState}
                        onChange={this.handleEditorChange}
                        placeholder={'请输入内容'}
                    />
                </Card>
                <Modal
                    title={'内容如下：'}
                    visible={this.state.showRichText}
                    footer={null}
                    onCancel={() => this.setState({
                        showRichText: false
                    })}
                >
                    {this.state.editorState.toHTML()}
                </Modal>
            </div>

        )

    }

}