import React from 'react';
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/monokai";
import "brace/ext/language_tools";

export interface CodeAceProps {
  code: string
}

function CodeAce (props: CodeAceProps) {
  const {code} = props;

  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      name="js"
      readOnly
      value={code}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      maxLines={Infinity}
      width="100%"
      highlightActiveLine={true}
      enableBasicAutocompletion={true}
      enableLiveAutocompletion={true}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}/>
  );
}

export default CodeAce;