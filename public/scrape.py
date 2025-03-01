import requests
from bs4 import BeautifulSoup
import json

def get_imsakiyah(city="sidoarjo", year=2024):
    url = f"https://bimasislam.kemenag.go.id/jadwalimsakiyah"  # Sesuaikan jika ada endpoint spesifik
    params = {
        "kota": city,
        "tahun": year
    }
    response = requests.get(url, params=params)
    
    if response.status_code != 200:
        print("Gagal mengambil data")
        return None
    
    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table", {"class": "table"})
    
    if not table:
        print("Tabel tidak ditemukan")
        return None
    
    data = []
    headers = [th.text.strip() for th in table.find_all("th")]
    
    for row in table.find_all("tr")[1:]:  # Lewati header
        cols = row.find_all("td")
        if len(cols) > 1:
            entry = {headers[i]: cols[i].text.strip() for i in range(len(cols))}
            data.append(entry)
    
    return data

# Ambil data untuk Sidoarjo tahun 2024
data_imsakiyah = get_imsakiyah("sidoarjo", 2024)

# Simpan ke file JSON
if data_imsakiyah:
    with open("imsakiyah_sidoarjo_2024.json", "w", encoding="utf-8") as f:
        json.dump(data_imsakiyah, f, ensure_ascii=False, indent=4)
    print("Data berhasil disimpan ke imsakiyah_sidoarjo_2024.json")
