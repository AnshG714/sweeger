API_KEY = ''
with open("../env/.env") as f:
    content = f.readlines()
    for data in content:
        data_split = data.strip().split(': ')

        if data_split[0].upper() == 'YOUTUBE_API_KEY':
            API_KEY = data_split[-1]

