<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:t="http://gbortosky/Theater.xsd" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <xsl:output method="html" indent="yes"/>
  <xsl:key name="ProducerKey" match="t:Producer" use="@id" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="content-type" content="text/html; charset=iso-8859-1" />
        <title>Theater Resume</title>
        <style type="text/css" media="all">@import url(layout1.css);</style>
      </head>
      <body>
        <div id="Content">
          <p>My Community Theater Resume</p>
          <table border="1" cellpadding="4" cellspacing="0">
            <tr>
              <th>Production</th>
              <th>Opening Date</th>
              <th>Role</th>
              <th>Producer</th>
            </tr>
            <xsl:apply-templates select="t:Theater/t:Productions/t:Production">
              <xsl:sort select="t:Opening" order="descending" />
            </xsl:apply-templates>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
  <xsl:template match="t:Production">
    <tr xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="t:Show" />
      <xsl:apply-templates select="t:Opening" />
      <xsl:apply-templates select="t:Role" />
      <xsl:apply-templates select="key('ProducerKey', @Producer)" />
    </tr>
  </xsl:template>
  <xsl:template match="t:Show">
    <td xmlns="http://www.w3.org/1999/xhtml">
      <xsl:choose>
        <xsl:when test="../@rdf:resource">
          <a>
            <xsl:attribute name="href">
              <xsl:value-of select="../@rdf:resource" />
            </xsl:attribute>
            <xsl:attribute name="title">
              <xsl:text>Information about this production of </xsl:text>
              <xsl:value-of select="." />
            </xsl:attribute>
            <xsl:apply-templates />
          </a>
        </xsl:when>
        <xsl:otherwise>
          <xsl:apply-templates />
        </xsl:otherwise>
      </xsl:choose>
    </td>
  </xsl:template>
  <xsl:template match="t:Opening">
    <td xmlns="http://www.w3.org/1999/xhtml">
      <xsl:call-template name="ConvertDate">
        <xsl:with-param name="adate" select="." />
      </xsl:call-template>
    </td>
  </xsl:template>
  <xsl:template match="t:Role">
    <td xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates />
    </td>
  </xsl:template>
  <xsl:template match="t:Producer">
    <td xmlns="http://www.w3.org/1999/xhtml">
      <xsl:choose>
        <xsl:when test="@rdf:resource">
          <a>
            <xsl:attribute name="href">
              <xsl:value-of select="@rdf:resource" />
            </xsl:attribute>
            <xsl:attribute name="title">
              <xsl:text>Web page for </xsl:text>
              <xsl:value-of select="t:Name" />
            </xsl:attribute>
            <xsl:apply-templates />
          </a>
        </xsl:when>
        <xsl:otherwise>
          <xsl:apply-templates />
        </xsl:otherwise>
      </xsl:choose>
    </td>
  </xsl:template>
  <xsl:template match="t:Producer/t:Name">
    <xsl:value-of select="." />
  </xsl:template>
  <xsl:template name="ConvertDate">
    <xsl:param name="adate" />
    <xsl:value-of select="substring($adate,6,5)" />-<xsl:value-of select="substring($adate,1,4)" />
  </xsl:template>
</xsl:stylesheet>
