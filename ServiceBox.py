class ServiceBox(object):
    def __init__(self):
        print(f'this is SB id : {id(self)}')
        self._now_service = None

    def __del__(self):
        print("SB Class is deleted!")        

    def add_service(self,new_service):# 서비스 추가
        self._now_service = new_service

    def has_service(self): # 서비스 유무 확인
        return self._now_service is not None

    def get_service(self): #서비스 가져오기
        return self._now_service
        
    def remove_service(self): # 서비스 삭제
        if self.has_service():
            tmp = self._now_service
            self._now_service = None
            return tmp
        else:
            pass