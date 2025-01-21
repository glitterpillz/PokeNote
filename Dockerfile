# FROM python:3.9.18-alpine3.18

# RUN apk add build-base

# RUN apk add postgresql-dev gcc python3-dev musl-dev

# ARG FLASK_APP
# ARG FLASK_ENV
# ARG DATABASE_URL
# ARG SCHEMA
# ARG SECRET_KEY
# ARG AWS_BUCKET_NAME
# ARG AWS_BUCKET_REGION
# ARG AWS_ACCESS_KEY_ID
# ARG AWS_SECRET_ACCESS_KEY

# WORKDIR /var/www

# ENV AWS_BUCKET_NAME=${AWS_BUCKET_NAME}
# ENV AWS_BUCKET_REGION=${AWS_BUCKET_REGION}
# ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
# ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
# ENV FLASK_APP=${FLASK_APP}
# ENV FLASK_ENV=${FLASK_ENV}
# ENV DATABASE_URL=${DATABASE_URL}
# ENV SCHEMA=${SCHEMA}
# ENV SECRET_KEY=${SECRET_KEY}

# COPY requirements.txt .

# RUN pip install -r requirements.txt
# RUN pip install psycopg2

# COPY . .

# RUN flask db upgrade
# RUN flask seed all
# CMD gunicorn app:app

# Use a specific Python version as the base image
FROM python:3.9.18-alpine3.18

# Install required dependencies
RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

# Set environment variables (make sure they are passed correctly during build)
ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY
ARG AWS_BUCKET_NAME
ARG AWS_BUCKET_REGION
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

# Configure AWS environment variables for use within the container
ENV AWS_BUCKET_NAME=${AWS_BUCKET_NAME}
ENV AWS_BUCKET_REGION=${AWS_BUCKET_REGION}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}

# Set the working directory inside the container
WORKDIR /var/www

# Copy the requirements file first (helps with caching dependencies)
COPY requirements.txt .

# Create and activate a virtual environment to avoid installing dependencies globally
RUN python3 -m venv /env
ENV PATH="/env/bin:$PATH"

# Install the required Python packages in the virtual environment
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir psycopg2

# Copy the rest of the application files into the container
COPY . .

# Run database migrations (ensure environment variables are properly set)
RUN echo "Running flask db upgrade" && flask db upgrade

# Seed the database (if applicable)
RUN flask seed all

# Start the Flask application using Gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000"]

