class IOngoingPacket(object):
    def __init__(self):
        pass
    def has_next(self):
        raise NotImplementedError()
    def get_next(self):
        raise NotImplementedError()
    def put_current_response(self,resp):
        raise NotImplementedError()
    def get_data(self):
        raise NotImplementedError()
    def get_service_name(self):
        raise NotImplementedError()    
    def do_sequence(self,selected_statement):
        return NotImplementedError()