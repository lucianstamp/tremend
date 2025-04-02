FROM python:3.11-slim
WORKDIR /app
COPY calculator.py /app
COPY requirements.txt /app
RUN python -m venv venv && \
    venv/bin/pip install --no-cache-dir -r requirements.txt
EXPOSE 8080
CMD venv/bin/python ./calculator.py






