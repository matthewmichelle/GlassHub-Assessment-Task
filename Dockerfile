# A builder image for building needed dependencies
FROM node:18 as builder

ENV PATH /app/node_modules/.bin:$PATH
ENV OPENSSL_CONF /dev/null 
WORKDIR /home/grasshub

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /sbin/tini
RUN chmod +x /sbin/tini

RUN groupadd -r grasshub && useradd -r -g grasshub grasshub

RUN chown -R grasshub:grasshub /home/grasshub
RUN chmod 755 /home/grasshub

USER grasshub


COPY --chown=grasshub:grasshub package*.json ./

RUN npm install
# to use cached layers instead of install them every build
COPY --chown=grasshub:grasshub . .


EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]

# Run your program under Tini
CMD ["npm", "run", "dev"]