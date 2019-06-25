import requests
import json
from bs4 import BeautifulSoup
from collections import Counter

def extract_table(t, interval='bubble_chart'):
	cell = t.find_all('td')
	dic = {}
	for i in range(5):
		i = 0

		while i < len(cell):
			obj = {}
			obj['id'] = cell[i].get_text().replace('\n', '')
			obj['prerequisite'] = [a.get_text() for a in cell[i + 1].find_all('a')]
			obj['prerequisite'] = list(filter(lambda x: x != "待验证", obj['prerequisite']))
			obj['name_ja'] = cell[i + 2].find('span',{'lang': "ja"}).get_text()
			obj['name'] =  cell[i + 2].find('span',{'style': "font-weight:bold"}).get_text()
			obj['description_ja'] = cell[i + 3].find('span',{'lang': "ja"}).get_text()
			obj['description'] = cell[i + 3].find('span',{'style': "font-weight:bold"}).get_text()
			try:
				obj['fuel'] = int(cell[i + 4].get_text().replace('\n', ''))
			except:
				obj['fuel'] = 0
			try:
				obj['arma'] = int(cell[i + 5].get_text().replace('\n', ''))
			except:
				obj['arma'] = 0
			try:
				obj['steal'] = int(cell[i + 6].get_text().replace('\n', ''))
			except:
				obj['steal'] = 0
			try:
				obj['al'] = int(cell[i + 7].get_text().replace('\n', ''))
			except:
				obj['al'] = 0
			if cell[i + 8].find('div', {'class': "mgtip-tip"}):
				cell[i + 8].find('div', {'class': "mgtip-tip"}).decompose()

			for br in cell[i + 8].find_all('br'):
				br.replace_with(", ")
			obj['reward'] = cell[i + 8].get_text().replace('\n', '')
			obj['tips'] = cell[i + 9].get_text().replace('\n', '')
			obj['interval'] = interval
			i += 10
			dic[obj['id']] = obj
	return dic

if __name__ == "__main__":
	res = requests.get("https://zh.kcwiki.org/wiki/%E4%BB%BB%E5%8A%A1#.E5.91.A8.E5.B8.B8.E4.BB.BB.E5.8A.A1")
	soup = BeautifulSoup(res.content, features="lxml")
	tables = soup.find_all('table', {'class': 'wikitable'})
	all_data = {}
	for table in tables:
		if table.find('th').get_text() == "编号\n":
			all_data.update(extract_table(table))
	for table in tables:
		if table.find('td').get_text() == "Bd1\n":
			all_data.update(extract_table(table, 'filter_1'))
		if table.find('td').get_text() == "Bw1\n":
			all_data.update(extract_table(table, 'filter_7'))
		if table.find('td').get_text() == "Bm1\n":
			all_data.update(extract_table(table, 'replay_30'))
		if table.find('td').get_text() == "Bq1\n":
			all_data.update(extract_table(table, 'looks_4'))
	try:
		with open('../data/missions.json', 'r', encoding='utf-8') as file:
			original = json.load(file)
			for m in original:
				all_data.update({m['id']: m})
	except:
		pass

	with open('../data/missions.json', 'w', encoding="utf-8") as file:
		json.dump(sorted(list(all_data.values()), key=lambda x: x['id']),fp=file, ensure_ascii=False, indent=2)
	print("---success, find %d missions---" %(len(all_data)))
