"""Build the English and Russian 2026/27 PDFs with the site's Inter fonts.

Install: pip install -r scripts/requirements-term-calendar.txt
Run from any directory: python3 scripts/generate-term-calendar.py
Source verified 2026-10-22; check the council page before changing the dates.
"""
from io import BytesIO
from pathlib import Path

from fontTools.ttLib import TTFont as WebFont
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
SOURCE = 'https://www.hounslow.gov.uk/schools-colleges/school-term-dates'
BLUE = HexColor('#001573')
ORANGE = HexColor('#FF6434')
WHITE = HexColor('#FFFFFF')
COPY = {
    'en': {
        'title': 'Hounslow school calendar',
        'subtitle': 'School terms and holidays · 2026/27',
        'terms': [
            ('Term 1 — Autumn 2026', 'Wednesday 2 September to Friday 18 December 2026 (73 days)',
             'Half term: Monday 26 October to Friday 30 October 2026'),
            ('Term 2 — Spring 2027', 'Monday 4 January to Thursday 25 March 2027 (54 days)',
             'Half term: Monday 15 February to Friday 19 February 2027'),
            ('Term 3 — Summer 2027', 'Monday 12 April to Thursday 22 July 2027 (68 days)',
             'Half term: Monday 31 May to Friday 4 June 2027'),
        ],
        'holiday': 'Bank holiday: Monday 3 May 2027',
        'other': 'There are no other bank holidays scheduled during term time.',
        'notes_title': 'School dates and swimming lessons',
        'notes': [
            'These dates apply to community schools in Hounslow. Academies, foundation and voluntary-aided schools may set different dates. Check your school’s website.',
            'The calendar includes 195 days for teachers and 190 days for pupils. Each school sets five INSET training days; check your school’s website for these dates.',
            'Please confirm LiutSwim lesson dates with us. School holidays do not by themselves confirm changes to swimming lessons.',
        ],
        'source': 'Source: London Borough of Hounslow · School term dates',
        'verified': 'Source checked: 22 October 2026. Check the council website for updates.',
        'credit': 'Prepared by LiutSwim using council information.',
    },
    'ru': {
        'title': 'Школьный календарь Hounslow',
        'subtitle': 'Учебные периоды и каникулы · 2026/27',
        'terms': [
            ('Период 1 — Осень 2026', 'Со среды 2 сентября по пятницу 18 декабря 2026 года (73 дня)',
             'Каникулы: с понедельника 26 октября по пятницу 30 октября 2026 года'),
            ('Период 2 — Весна 2027', 'С понедельника 4 января по четверг 25 марта 2027 года (54 дня)',
             'Каникулы: с понедельника 15 февраля по пятницу 19 февраля 2027 года'),
            ('Период 3 — Лето 2027', 'С понедельника 12 апреля по четверг 22 июля 2027 года (68 дней)',
             'Каникулы: с понедельника 31 мая по пятницу 4 июня 2027 года'),
        ],
        'holiday': 'Государственный выходной: понедельник 3 мая 2027 года',
        'other': 'Других государственных выходных в учебное время не предусмотрено.',
        'notes_title': 'Школьные даты и занятия плаванием',
        'notes': [
            'Даты относятся к муниципальным школам Hounslow (community schools). Академии, школы фондов и школы с частичным государственным финансированием могут устанавливать другие даты. Проверьте сайт своей школы.',
            'Календарь включает 195 рабочих дней для учителей и 190 учебных дней для учеников. Пять дней подготовки учителей (INSET) каждая школа назначает отдельно; даты смотрите на её сайте.',
            'Даты занятий LiutSwim уточняйте у нас. Школьные каникулы сами по себе не подтверждают изменения в расписании плавания.',
        ],
        'source': 'Источник: London Borough of Hounslow · School term dates',
        'verified': 'Источник проверен 22 октября 2026 года. Обновления — на сайте совета.',
        'credit': 'Подготовлено LiutSwim по данным совета. Перевод на русский — LiutSwim.',
    },
}


def register_fonts():
    # Embed the actual website fonts, including Cyrillic, in each PDF.
    for face, filename in [('Inter', 'Inter-Regular.woff'), ('InterMedium', 'Inter-Medium.woff')]:
        webfont = WebFont(ROOT / 'public/fonts' / filename)
        webfont.flavor = None
        output = BytesIO()
        webfont.save(output)
        output.seek(0)
        pdfmetrics.registerFont(TTFont(face, output))


def paragraph(pdf, text, x, top, width, size=10, bold=False, color=BLUE):
    style = ParagraphStyle('calendar', fontName='InterMedium' if bold else 'Inter',
                           fontSize=size, leading=size * 1.5, textColor=color)
    p = Paragraph(text, style)
    _, height = p.wrap(width, 842)
    p.drawOn(pdf, x, top - height)
    return top - height


def generate(language):
    copy = COPY[language]
    suffix = '-ru' if language == 'ru' else ''
    output = ROOT / f'public/documents/hounslow-school-term-dates-2026-27{suffix}.pdf'
    output.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(output), pagesize=(595.28, 841.89), pageCompression=1)
    pdf.setTitle(copy['title'] + ' 2026/27')
    pdf.setAuthor('LiutSwim')
    pdf.setSubject('Hounslow school term dates 2026/27 · ' + language)
    pdf.setFillColor(BLUE)
    pdf.rect(0, 697, 596, 145, fill=1, stroke=0)
    paragraph(pdf, 'LIUTSWIM', 36, 813, 523, 17, True, WHITE)
    paragraph(pdf, copy['title'], 36, 771, 523, 23 if language == 'en' else 22, True, WHITE)
    paragraph(pdf, copy['subtitle'], 36, 728, 523, 12, False, WHITE)

    for index, (heading, dates, holidays) in enumerate(copy['terms']):
        top = 674 - index * 116
        pdf.setStrokeColor(BLUE)
        pdf.setLineWidth(1)
        pdf.roundRect(36, top - 102, 523, 102, 10, fill=0, stroke=1)
        pdf.setFillColor(ORANGE)
        pdf.roundRect(36, top - 31, 523, 31, 10, fill=1, stroke=0)
        pdf.rect(36, top - 31, 523, 15, fill=1, stroke=0)
        paragraph(pdf, heading, 50, top - 5, 495, 12, True, WHITE)
        paragraph(pdf, dates, 50, top - 43, 495, 10)
        paragraph(pdf, holidays, 50, top - 66, 495, 9.5)

    top = paragraph(pdf, copy['holiday'], 36, 321, 523, 10, True)
    top = paragraph(pdf, copy['other'], 36, top - 5, 523, 9)
    top = paragraph(pdf, copy['notes_title'], 36, top - 17, 523, 12, True)
    for note in copy['notes']:
        top = paragraph(pdf, note, 36, top - 7, 523, 9)
    if top < 95:
        raise ValueError(f'{language}: notes overlap footer at {top}')

    pdf.setStrokeColor(BLUE)
    pdf.line(36, 88, 559, 88)
    paragraph(pdf, copy['source'], 36, 80, 523, 8, True)
    paragraph(pdf, SOURCE, 36, 65, 523, 7)
    pdf.linkURL(SOURCE, (36, 52, 559, 65), relative=0)
    paragraph(pdf, copy['verified'], 36, 49, 523, 7)
    paragraph(pdf, copy['credit'], 36, 35, 523, 7)
    pdf.showPage()
    pdf.save()
    print(f'Created {output}')


if __name__ == '__main__':
    register_fonts()
    for language in COPY:
        generate(language)
