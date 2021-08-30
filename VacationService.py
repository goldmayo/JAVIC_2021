from OngoingPacket import IOngoingPacket
from datetime import datetime
import common_api_frame as api_frame

class VacationService(IOngoingPacket):    
    def __init__(self):
        super().__init__()
        print(f'this is VacationService id : {id(self)}')
        self.__service_name = None
        self.__start_date = None
        self.__end_date = None
        self.__agreement = False 
        self.__system_date_format = '%Y%m%d'
        self.__today = datetime.today().strftime(self.__system_date_format) #yyyymmdd
        self.__dict =  {
            1:"시작 날짜를 입력해주세요.(YYYYMMDD)",
            2:"종료 날짜를 입력해주세요(YYYYMMDD)",
            3:str(self.__start_date)+"부터 "+str(self.__end_date)+"까지 휴가를 신청하시겠습니까?",
            -1:"알 수 없음"
            }
        self.__invalid_msg = {
            1:"날짜형식 혹은 시작일이 올바르지 않습니다. 다시 입력해주세요.",
            2:"날짜형식 혹은 종료일이 올바르지 않습니다. 다시 입력해주세요.",
            3:"확인과 취소를 선택해주세요.",
            -1:"날짜형식이 올바르지 않습니다. 다시 입력해주세요."
            }
    def __del__(self):
        print("RRClass is deleted!")

    def getData(self):
        return (self.__start_date, self.__end_date, self.__request_status)
    
    def getServiceName(self):
            return self.__service_name
    
    def setServiceName(self,name):
            self.__service_name = name
    
    def hasNext(self):
        return self.__start_date is None or self.__end_date is None or self.__agreement is False
    
    def getNextAsNumber(self):
        if self.hasNext():
            if self.__start_date is None:
                return 1
            elif self.__end_date is None:
                return 2
            elif self.__agreement is False:
                return 3
            else:
                return False
        else:
            return None
            
    def getNext(self):
        print(f'this is getNext() in VacationService id : {id(self)}')
        n = self.getNextAsNumber()
        if n is not None:
            return self.__dict[n]
        else:
            return None

    def resendRequestMSG(self): #재전송 MSG
        print(f'this is requestMSG() in VacationService id : {id(self)}')
        n = self.getNextAsNumber()
        if n is None:
            return None
        else:
            return self.__invalid_msg[n]
            
    def checkFormat(self,dates):
        try:
            input_date = datetime.strptime(str(dates),self.__system_date_format) # 날짜 형식체크 
            del(input_date)
            return True
        except ValueError:
            return False
    
    def checkValid(self,resp):
        num = self.getNextAsNumber()
        if num is None:
            pass
        elif num==1:
            if self.checkFormat(resp):
                if  int(resp) > int(self.__today):
                    return True
                else:
                    return False # 지난 날짜 __start_date = None > getNextAsNumber = 1
            else:
                return False # 날짜형식이 올바르지 않음
        elif num==2:
            if self.checkFormat(resp):
                if int(resp) > int(self.__start_date):
                    return True
                else:
                    return False # 휴가 시작일이 종료일보다 더 뒤의 날짜 __end_date = None > getNextAsNumber = 2
            else:
                return False # 날짜형식이 올바르지 않음
        elif num==3: # y/n
            if self.__agreement == True: # yes 취소는 아예 doSequence가 실행이 되지 않음
                return True
            else: # yes말고 내려올 건 숫자 밖에 없음
                return False # 에러 예 아니오 
        else:
            return False

    def putCurrentResponse(self,resp):
        num = self.getNextAsNumber()
        if num is None:
            pass
        elif num==1:
            self.__start_date = resp
        elif num==2:
            self.__end_date = resp
        elif num==3:
            pass

    def setAgreement(self,agree):
        self.__agreement = agree

    def doSequence(self,input_statement):
        if self.hasNext(): #<__start_date, __end_date 둘 중 하나라도 none이면 true>
            if self.checkValid(input_statement.text): # bool
                self.putCurrentResponse(input_statement.text)
                if self.hasNext(): #실행구역
                    if self.getNextAsNumber() == 3: #유저가 네 라고하면 
                        return api_frame.wrapContent(str(self.__start_date)+"부터 "+str(self.__end_date)+"까지 휴가를 신청하시겠습니까?",type="confirm") # 다음 입력 메세지
                    else:
                        return api_frame.wrapContent(self.getNext()) # 다음 입력 메세지
                else:

                    # ###
                    #     """
                    #     확인/취소            
                    #     취소누르면 process에서 입력받자마자 컷 해줌
                    #     예스하면 self.__agreement = True 
                    #     yes > setAgreement > self.__agreement = True > hasNext() #실행구역 = False
                    #     """
                    if self.__agreement == True:
                        # return Draft_Vacation(self.__start_date,self.__end_date)
                        return api_frame.wrapContent(str(self.__start_date)+"부터 "+str(self.__end_date)+"까지 휴가를 신청하였습니다.",type="confirm"),True # 다음 입력 메세지

                    else:
                        return api_frame.wrapContent("휴가신청을 취소합니다."),True
            else:
                return api_frame.wrapContent(self.resendRequestMSG())           
        else: # <__start_date, __end_date, confirm(y/n) 모두 충족>
            if self.__agreement:
                # return  Draft_Vacation(self.__start_date,self.__end_date)
                return api_frame.wrapContent(str(self.__start_date)+"부터 "+str(self.__end_date)+"까지 휴가를 신청하였습니다."),True # 다음 입력 메세지
            else:
                return api_frame.wrapContent("휴가신청을 취소합니다."), True
