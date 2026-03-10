import os
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
)
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from django.conf import settings

LOGO_PATH = os.path.join(settings.BASE_DIR, "logo.png")


def generate_gis_pdf(data):
    buffer = data["buffer"]
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=30, 
        rightMargin=30,
        topMargin=30,
        bottomMargin=30
    )

    styles = getSampleStyleSheet()
    elements = []

    # ---------------------------
    # HEADER WITH LOGO + TITLE
    # ---------------------------
    header_cells = []

    if os.path.exists(LOGO_PATH):
        header_cells.append(Image(LOGO_PATH, width=70, height=70))
    else:
        header_cells.append(Paragraph("<b>AGRI VISION</b>", styles["Title"]))

    title_style = ParagraphStyle(
        name="titleStyle",
        alignment=1,
        fontSize=18,
        textColor=colors.HexColor("#006400"),
        leading=22
    )

    header_cells.append(
        Paragraph(
            "<b>GIS FIELD MAP REPORT</b><br/><font size=11>Spatial Weed Zone Analysis</font>",
            title_style
        )
    )

    header_table = Table([header_cells], colWidths=[90, 400])
    header_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (1, 0), (1, 0), "CENTER"),
    ]))

    elements.append(header_table)
    elements.append(Spacer(1, 20))

    green_bar = Table(
        [[" "]],
        colWidths=[doc.width],     # FULL WIDTH BAR
        rowHeights=[8]             # HEIGHT OF BAR
    )
    green_bar.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#006400")),
        ("LEFTPADDING", (0,0), (-1,-1), 0),
        ("RIGHTPADDING", (0,0), (-1,-1), 0),
        ("TOPPADDING", (0,0), (-1,-1), 0),
        ("BOTTOMPADDING", (0,0), (-1,-1), 0),
    ]))
    elements.append(green_bar)
    elements.append(Spacer(1, 12))

    # ---------------------------
    # FIELD INFORMATION BLOCK
    # ---------------------------
    info_style = ParagraphStyle(
        name="infoStyle",
        fontSize=12,
        textColor=colors.black,
        leading=15
    )

    elements.append(Paragraph(
        f"<b>Field Name:</b> {data['field_name']}<br/>"
        f"<b>Weed Percentage:</b> {data['weed_percentage']}%",
        info_style
    ))

    elements.append(Spacer(1, 20))

    # ---------------------------
    # MAP IMAGE SECTION
    # ---------------------------
    if "map_image" in data and os.path.exists(data["map_image"]):
        elements.append(Paragraph(
            "<b>Weed Density Map</b>",
            ParagraphStyle(name="mapTitle", fontSize=14, textColor=colors.HexColor("#006400"))
        ))
        #elements.append(Spacer(1, 8))
        elements.append(Spacer(1, 26))  # 1.5 lines
        map_img = Image(data["map_image"], width=450, height=300)
        map_img.hAlign = "CENTER"

        elements.append(map_img)
        elements.append(Spacer(1, 25))

    # -------------------------------------------------
    # FULL-WIDTH GREEN BAR (REPLACES YOUR OLD ONE)
    # -------------------------------------------------
    green_bar = Table(
        [[" "]],
        colWidths=[doc.width],     # FULL WIDTH BAR
        rowHeights=[8]             # HEIGHT OF BAR
    )
    green_bar.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#006400")),
        ("LEFTPADDING", (0,0), (-1,-1), 0),
        ("RIGHTPADDING", (0,0), (-1,-1), 0),
        ("TOPPADDING", (0,0), (-1,-1), 0),
        ("BOTTOMPADDING", (0,0), (-1,-1), 0),
    ]))
    elements.append(green_bar)
    elements.append(Spacer(1, 12))


    # -------------------------------------------------
    # TABLE TITLE
    # -------------------------------------------------
    elements.append(Paragraph(
        "<b>Identified Weed Zones</b>",
        ParagraphStyle(name="zonesTitle", fontSize=14, textColor=colors.HexColor("#006400"))
    ))
    elements.append(Spacer(1, 12))


    # -------------------------------------------------
    # FIXED TABLE – AUTO FULL-WIDTH
    # -------------------------------------------------
    table_data = [["Zone ID", "X", "Y", "Instruction"]]

    for z in data["zones"]:
        table_data.append([
            z["zone_id"],
            round(z["x"], 2),
            round(z["y"], 2),
            z["instruction"]
        ])

    # AUTO COLUMN WIDTHS (no fixed sizing!)
    table = Table(table_data, colWidths=[doc.width * 0.12,
                                        doc.width * 0.12,
                                        doc.width * 0.12,
                                        doc.width * 0.64])

    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#006400")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),

        ("GRID", (0, 0), (-1, -1), 0.7, colors.black),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (0, 0), (2, -1), "CENTER"),   # Align first 3 columns
        ("ALIGN", (3, 1), (3, -1), "LEFT"),     # Instruction is left aligned

        ("ROWBACKGROUNDS", (0, 1), (-1, -1),
        [colors.whitesmoke, colors.lightgrey]),
    ]))

    elements.append(table)
    elements.append(Spacer(1, 25))
    # MAP IMAGE SECTION
    if data.get("map_image") and os.path.exists(data["map_image"]):
        elements.append(Paragraph("<b>Field Heat Map:</b>", styles["Heading3"]))
        elements.append(Spacer(1, 10))
        elements.append(Image(data["map_image"], width=480, height=320))
        elements.append(Spacer(1, 20))
    # Footer
    footer_style = ParagraphStyle(
        name="footer",
        alignment=1,
        fontSize=10,
        textColor=colors.gray
    )

    elements.append(Paragraph(
        "<i>GIS Report generated by AgriVision WeedSense</i>",
        footer_style
    ))

    doc.build(elements)
    buffer.seek(0)
    return buffer