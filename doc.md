## Scrapping Process
1) Get all current public bin urls
2) Filter out the ones that already have been processed
3) Add bin urls to download queue
4) Process queue
    4.1) Download bin and its metadata (bin url, upload date, uploader, submitted type, etc)
    4.2) Analyze bin and determine if it should be stored (quick access, deep storage) or not.
    4.3) Store metadata, analysis output and bin (depending on analysis)

Process runs every minute


## Bin Analysis Process
Storage rules: 
    - Metadata and analysis output is always stored.
    - Bins are stored if they contain any of the data listed in Reporting #5 items.
    - Files older than 1 year have to be compressed.


1)


## Reporting
<< Need to research Elastic Search >>

Questions I'd like to answer:
1) How many public files are uploaded in average by: day, week, month
2) File type popularity
3) Average file size by type
4) Frequent uploaders (users)
5) How many bins contained:
    5.1) username and password
    5.2) api keys
    5.3) IPs
    5.4) credit card numbers
    5.5) malicious code/toolkits
6) Retrieve bins from #5 by group, date and content (for instance, containing certain email or username)
7) Public bin upload ratio between guests and registered users


## Future ideas
1) Live Querying - searching in the system triggers a search in pastebin and runs the scrapping process for the results. This provides the user with the requested information while also building the system's historical database.
2) 