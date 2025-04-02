FROM python:3.13
WORKDIR /app
COPY calculator.py /app
COPY requirements.txt /app
RUN pip install -r requirements.txt
EXPOSE 8080
CMD python ./calculator.py






