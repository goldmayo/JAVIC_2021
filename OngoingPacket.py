class IOngoingPacket(object):
    def __init__(self):
        pass
    def hasNext(self):
        raise NotImplementedError()
    def getNext(self):
        raise NotImplementedError()
    def putCurrentResponse(self,resp):
        raise NotImplementedError()
    def getData(self):
        raise NotImplementedError()
    def getServiceName(self):
        raise NotImplementedError()    
    def doSequence(self,selected_statement):
        return NotImplementedError()