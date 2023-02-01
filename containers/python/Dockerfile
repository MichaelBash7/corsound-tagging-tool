FROM python:3.9-slim

ENV TZ="Israel"
# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1
# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install & use pipenv
COPY ./app/Pipfile ./app/Pipfile.lock ./
WORKDIR /app
RUN python -m pip install --upgrade pip
RUN pip install pipenv
RUN pipenv install --system --deploy

EXPOSE 8000

CMD ["python", "src/main.py"]