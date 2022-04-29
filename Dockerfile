FROM python:3.8

# store in /project
WORKDIR /project

# copy requirements.txt into container's /project/
ADD . /project

# isntall python lib
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python","main.py"]
