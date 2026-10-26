# TurnBonusRaptor 🦖

**Shift, Production & Bonus Tracker**  
Web Development 1 – Front End | Laurea University of Applied Sciences  
**Developer:** Israel Garcia

**Live application:** https://israelgarciareal.dev/TurnBonusRaptor/  
**GitHub repository:** https://github.com/IsraelGarcia666/TurnBonusRaptor

## 1. Project overview

TurnBonusRaptor is a browser-based application for recording production work and estimating performance bonuses. The idea came from practical warehouse work: one working day may involve several products, each with different quantities and bonus rates. I wanted to build something useful while practising JavaScript, DOM manipulation, forms, validation and browser storage.

The app keeps **work entries** separate from **shifts**. A work entry records time spent on a particular product or project; several entries with the same date count as one workday/shift in the monthly summary. The estimated bonus for each entry is calculated as:

**Completed units × bonus rate per unit = estimated bonus**

The name **TurnBonusRaptor** is a playful combination of the Spanish word _turno_ (work shift), _bonus_, and _rapport_, a concept familiar from my background in anthropology. In anthropological fieldwork, _rapport_ refers to building trust, mutual understanding, and positive relationships with the people being studied. It is an important part of ethnographic research.

The _raptor_ part also refers to the _Velociraptor_, a dinosaur associated with speed and agility, reflecting the idea of tracking work and bonuses quickly and efficiently.

The result is a little wordplay combining my academic background, the application's purpose, and some dinosaur humor.

## 2. Main features

- **Add Work Entry:** record the date, project, product number, batch number, hours, completed units and per-unit bonus rate.
- **Bonus calculation:** automatically calculate and display an estimated bonus for each entry.
- **Validation and feedback:** highlight incorrect fields and display feedback; zero units and zero bonus rates are allowed, while negative values are not.
- **Work Entries:** display saved entries and delete individual entries after confirmation.
- **Product Rate Book:** save product numbers with their projects and rates, display and delete products, and prevent duplicate product numbers.
- **Product suggestions and auto-fill:** select a saved product number to fill in its project and rate automatically.
- **Bonus Summary:** view totals for a selected historical month, including estimated bonus, number of workdays/shifts and completed units. A separate weekly bonus covers Monday through Sunday.
- **Daily-hours reminder:** when entries on the same date exceed 7.5 recorded hours, display a playful **Workasaurus** reminder. This is a warning, not a restriction: the entry is still saved.
- **Persistent browser data:** use `localStorage` to keep entries and product rates after a page refresh.
- **Responsive design:** adapt the layout and optimized WebP background images for desktop, tablet and mobile screens.

## 3. Technologies and techniques

- **HTML5:** semantic page structure, labelled form fields, date/month inputs and a `datalist` for product suggestions.
- **CSS3:** responsive media queries, CSS variables, focus styles and a dark visual theme.
- **Vanilla JavaScript:** DOM selection and creation, event listeners, validation, arrays and objects, `find()`, `some()`, `filter()`, `reduce()`, `forEach()` and `Set`.
- **Web Storage API:** `localStorage` with `JSON.stringify()` and `JSON.parse()`.
- **Git and GitHub:** version control and project documentation.
- **GitHub Pages:** public deployment through my custom domain.

No JavaScript framework or backend is required.

## 4. How to use the app

1. Open the [live application](https://israelgarciareal.dev/TurnBonusRaptor/).
2. Optionally open **Product Rate Book** and save a product number, project name and bonus rate.
3. In **Add Work Entry**, enter the date and the work details. Saved product numbers appear as suggestions and can auto-fill the project and rate.
4. Click the form's submit button. The new entry appears in **Work Entries** with its estimated bonus.
5. Use **Bonus Summary** to choose a month and review the monthly bonus, workdays and units. The weekly total always refers to the current Monday–Sunday week.
6. Delete unwanted entries or product-rate records with their **Delete** buttons.

### Example

A single 7.5-hour workday might contain three work entries:

| Product   |   Hours |  Units | Rate / unit | Estimated bonus |
| --------- | ------: | -----: | ----------: | --------------: |
| Product A |     2.0 |     30 |       €0.50 |          €15.00 |
| Product B |     3.0 |     20 |       €2.00 |          €40.00 |
| Product C |     2.5 |     20 |       €1.50 |          €30.00 |
| **Total** | **7.5** | **70** |             |      **€85.00** |

These are **three work entries but one shift/workday** because they share the same date.

## 5. Planning and wireframes

My initial plan was to build a straightforward shift and production tracker with bonus estimation and a Product Rate Book. As the project developed, I implemented persistent storage, automatic product-rate completion, weekly and monthly summaries, and additional usability features. The original idea gradually evolved as I better understood how one shift could contain several work entries.

### 5.1 Initial concept wireframe (v0.1.0)

The following is a reconstruction of my initial concept. At this stage, the application was planned as a simple shift tracker with bonus estimation and a basic Product Rate Book.

```text
+------------------------------------------------------+
| TurnBonusRaptor                                      |
| Shift, Production & Bonus Tracker                    |
+------------------------------------------------------+
| Add Shift Entry                                      |
| Date: [__________]   Project: [____________]         |
| Product: [_______]   Batch: [______________]         |
| Hours: [_________]   Units: [______________]         |
| Rate per unit (€): [________]                        |
| [               Add Shift Entry              ]      |
+------------------------------------------------------+
| Shift Entries                                        |
| [Date] [Product] [Units] [Bonus]                     |
+------------------------------------------------------+
| Bonus Overview                                       |
| Estimated bonus: €[__________]                       |
+------------------------------------------------------+
| Product Rate Book                                    |
| Product: [________] Project: [__________]            |
| Rate (€): [_______] [Save Product]                   |
+------------------------------------------------------+
```

### 5.2 Final implemented wireframe

As development progressed, the interface became more detailed. The application now distinguishes between individual work entries and work shifts, includes historical monthly and current weekly summaries, and provides a Product Rate Book with saved products, suggestions, and automatic rate completion.

The following wireframe represents the final implemented interface.

```text
+-----------------------------------------------------------------+
| TurnBonusRaptor                                                 |
| Shift, Production & Bonus Tracker                               |
+-----------------------------------------------------------------+
| Add Work Entry                                                  |
| Date [__________]       Project [________________]              |
| Product number [______]  Batch number [_________]               |
| Hours worked [_______]    Units completed [______]              |
| Bonus rate per unit (€) [________________________]              |
| [                    Add Work Entry                    ]        |
+-----------------------------------------------------------------+
| Work Entries                                                    |
| [Saved work entry card]                      [Delete]           |
+-----------------------------------------------------------------+
| Bonus Summary                                                   |
| View month [____________]                                       |
| Selected month bonus | Shifts | Units                           |
| This week's bonus                                               |
+-----------------------------------------------------------------+
| Product Rate Book                                               |
| [Open / Close]                                                  |
| Product number [____________________________]                   |
| Project [___________________________________]                   |
| Bonus rate per unit (€) [___________________]                   |
| [                     Save Product                    ]         |
| [Saved product card]                         [Delete]           |
+-----------------------------------------------------------------+
```

The design deliberately uses a dark warehouse-inspired background, readable contrast and simple cards. The background imagery was optimized into separate WebP sizes to keep the site lightweight.

## 6. Testing

I tested the application manually during development, including:

- Required-field and negative-number validation, as well as valid zero bonus rates.
- Adding, displaying and deleting work entries and products.
- Persistence after refreshing the browser.
- Duplicate product-number detection.
- Product suggestions and automatic project/rate completion.
- Monthly totals for different selected months and weekly totals.
- Multiple entries on the same date counting as one shift.
- The warning shown when daily recorded hours exceed 7.5.
- Layout checks using Chrome's responsive device preview.

## 7. Storage and limitations

The app is a **client-side learning project**. Data is stored in the current browser's `localStorage`, not in GitHub and not in an online database. Entries are not automatically shared between devices, browsers or different site origins. Clearing browser site data may remove saved records.

The displayed bonuses are **estimates**, not payroll calculations. The 7.5-hour threshold is a configurable product-design assumption for the demo, not an automatic judgement about permitted working hours. Only sample or non-sensitive data should be entered in the public demo.

Possible future improvements include exporting/importing data, editing existing entries, more advanced input limits and an optional light theme.

### Future Visual Design Improvements

Although I have introduced different accent colors for the main section headings, the overall color design still needs further development.

In the future, I would like to explore how colors can better distinguish each section and its functions while maintaining a consistent visual identity. This includes backgrounds, borders, buttons, readability, accessibility, and potentially a light theme.

I believe this deserves its own design and testing process rather than simply adding more colors. For this version, I decided to keep the current design and leave a more comprehensive color system for future development, as it is beyond the scope of this assignment.

### 8. AI Use Disclosure

I used ChatGPT as a learning and development assistant throughout this project. I already had basic knowledge of HTML and CSS from previous coursework, but JavaScript was relatively new to me and represented the main learning challenge.

ChatGPT helped me understand JavaScript concepts, suggested code snippets and functions, explained how they worked, and assisted with troubleshooting and documentation.

I worked directly with the code in VS Code, integrating, adapting, and testing the suggested solutions step by step. Whenever I encountered something unfamiliar, I asked for explanations to better understand the logic rather than simply moving forward without knowing what the code was doing.

The project's concept, purpose, design preferences, and functional requirements came from my own ideas and practical experience. AI provided substantial technical guidance, particularly with JavaScript, while I remained actively involved in the implementation, testing, and development decisions.

## 9. Self-assessment

The project meets my main learning goal: making a useful interactive website with JavaScript instead of only a static page. In particular, I learned how to connect HTML forms to the DOM, validate input, organize data into arrays and objects, create elements dynamically, react to events, and persist data through `localStorage`. The Product Rate Book and monthly/weekly summaries were the most demanding parts.

I am pleased with the functionality, responsive layout and the practical connection to real production work. At the same time, the app remains a prototype: there is no cloud database or account system, and additional usability and data-backup features could be developed later.

## 10. Demonstration video

**Demo video:**
[Watch the TurnBonusRaptor demonstration][def]

The video will show the live application, a new product in the Rate Book, adding work entries, automatic bonus calculations, validation, the Workasaurus warning, monthly/weekly summaries, and responsive design.

[def]: https://laureauas-my.sharepoint.com/:v:/g/personal/isg00005_laurea_fi/IQA544DIqy-IQ5gz4u9D6BKhATkN7Xl4jyDb5K-yFrP35HQ?e=X214wa
