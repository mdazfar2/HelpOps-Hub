# Use a base image with X11 support
FROM ubuntu:20.04

# Set environment variable to avoid dialog prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install required packages
RUN apt-get update && apt-get install -y firefox

# Set the display variable
ENV DISPLAY=:0

# Run Firefox
CMD ["firefox"]
               
