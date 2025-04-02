FROM python:3.11-slim
WORKDIR /app
COPY calculator.py /app
COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8080
CMD python ./calculator.py






