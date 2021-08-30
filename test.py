import re
# input_data = '3일부터 6일까지 휴가 신청해줘'
input_data = '월요일 오후 반차 신청해줘'
'''
휴가 신청

> 휴가 종류
> 시작, 종료일자
nums
> 일 부터 일 까지 신청이 완료되었습니다
'''

date_regex_dash = re.compile(r"([12]\d{3})-(0\d|1[0-2])-([0-2]\d|3[01])")
date_regex = re.compile(r"([12]\d{3})(0\d|1[0-2])([0-2]\d|3[01])")
date_regex_dot = re.compile(r"([12]\d{3}).(0\d|1[0-2]).([0-2]\d|3[01])")
date_regex_blank = re.compile(r"([12]\d{3}) (0\d|1[0-2]) ([0-2]\d|3[01])")
match = date_regex.search(input_data)
print(match)

output_data = ' '

request = {
    "intent_id" : "vacation",
    "input_data" : input_data,
    "request_type" : "text",
    "story_slot_entity" : {},
    "output_data" : output_data
}

story_slot_entity = {
    "주문" : {"메뉴" : None, "장소" : None, "날짜" : None},
    "예약" : {"장소" : None, "날짜" : None},
    "정보" : {"대상" : None},
    "vacation" : {"day_off" : {"시작날짜" : None, "종료날짜" : None}, "afternoon_off":{"오전" :None, "오후":None}},
    "오늘할일" : None,
    "취소" : None,
    "날씨" : {"도시" : None, "날짜" : None, "날씨정보" : None}
}

intent_id = '주문'
slot_value = story_slot_entity.get('주문')

date_list = ['오늘', '내일', '모레']
vacation_type_list = ['월차','반차']

from konlpy.tag import Mecab
mecab = Mecab("/usr/local/lib/mecab/dic/mecab-ko-dic")
# preprocessed = mecab.pos(request.get('input_data'))
preprocessed = mecab.nouns(request.get('input_data'))
print("\npreprocessed :",preprocessed)

for pos_tag in preprocessed :
    if pos_tag[1] in ['NNG', 'NNP', 'SL', 'MAG'] :
        if pos_tag[0] in menu_list :
            slot_value['메뉴'] = pos_tag[0]
        elif pos_tag[0] in loc_list :
            slot_value['장소'] = pos_tag[0]
        elif pos_tag[0] in date_list :
            slot_value['날짜'] = pos_tag[0]
print("\nstory_slot_entity.get('주문') :",story_slot_entity.get('주문'))

vSlot = story_slot_entity.get("vacation")
print(vSlot["dayOff"])
print(vSlot["halfOff"])

vSlot["dayOff"]
vSlot["halfOff"]

for pos_tag in preprocessed :
    if pos_tag[1] in ['NNG', 'NNP', 'SL', 'MAG'] :
        if pos_tag[0] in menu_list :
            slot_value['메뉴'] = pos_tag[0]
        elif pos_tag[0] in loc_list :
            slot_value['장소'] = pos_tag[0]
        elif pos_tag[0] in date_list :
            slot_value['날짜'] = pos_tag[0]
print("\nstory_slot_entity.get('주문') :",story_slot_entity.get('주문'))


if (None in slot_value.values()):
    empty_slot_values = ""
    for key in slot_value.keys():
        if(slot_value[key] is None):
            empty_slot_values += f'<{key}> '
            print("\nempty_slot_values :",empty_slot_values)
    output_data = empty_slot_values + "을(를) 입력해주세요"
else:
    output_data = "주문이 완료 되었습니다."
print("\noutput_data :",output_data)

response = {
    "intent_id" : " ",
    "input_data" : input_data,
    "request_type" : "text",
    "story_slot_entity" : {},
    "output_data" : " "
}

response["output_data"] = output_data

print("\nresponse[\"output_data\"] :",response["output_data"])


