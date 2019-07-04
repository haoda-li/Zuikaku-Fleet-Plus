import requests
import json
from bs4 import BeautifulSoup


def process_data(reward, require):
    if len(reward) < 22:
        return None
    ret = {}
    ret['id'] = reward[1]
    ret['name_ja'] = reward[3]
    ret['name'] = reward[5]
    ret['time'] = reward[7]
    ret['exp_commander'] = reward[9]
    ret['exp_ship'] = reward[11]
    ret['fuel'] = reward[13]
    ret['arma'] = reward[15]
    ret['steal'] = reward[17]
    ret['al'] = reward[19]
    ret['reward_a'] = reward[21]
    ret['reward_b'] = reward[23]
    ret['fleet_level'] = require[9]
    ret['flag_level'] = require[11]
    ret['min_number'] = require[13]
    ret['required'] = require[15]
    ret['required_arma'] = require[17]
    ret['fuel_consume'] = require[19]
    ret['arma_consume'] = require[21]
    return ret


if __name__ == "__main__":
    res = requests.get(
        "https://zh.kcwiki.org/wiki/%E8%BF%9C%E5%BE%81%E5%88%97%E8%A1%A8")
    soup = BeautifulSoup(res.content, features="lxml")
    tables = soup.find_all('table', {'class': 'wikitable'})

    data_get = []
    for table in tables:
        if table.find('th') and table.find('th').get_text() == "编号\n":
            data_get.append([t.get_text().split('\n')
                             for t in table.find_all("tr")][1:])

    all_expd = []
    for i in range(0, len(data_get), 2):
        for j in range(len(data_get[i])):
            try:
                all_expd.append(process_data(
                    data_get[i][j], data_get[i + 1][j]))
            except:
                continue
    with open('../data/expeditions.json', 'w', encoding="utf-8") as file:
        json.dump(all_expd, file, ensure_ascii=False, indent=2)
        print("---success, find %d missions---" % (len(all_expd)))
