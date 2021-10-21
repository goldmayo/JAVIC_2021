import json
def wrap_content(content,type="plain text"):
    msg = {"header":{"message_type":type,"who":"server"},"content":content}
   
    return json.dumps(msg,ensure_ascii=False,indent=3)