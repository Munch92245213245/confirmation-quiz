// All content is taken from the booklet and worksheet photos.

const PRAYERS = [
  { id: "contrition", title: "Act of Contrition",
    text: "My God, I’m sorry for my sins with all my heart. In choosing to do wrong and failing to do good, I have sinned against You whom I should love above all things. I firmly intend with your help to do penance, to sin no more, and to avoid whatever leads me to sin. Amen." },
  { id: "meal", title: "Prayer Before a Meal",
    text: "Bless us, O Lord, and these your gifts, which we are about to receive from the bounty of Christ our Lord. Amen." },
  { id: "michael", title: "St. Michael Prayer",
    text: "St. Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do Thou, O Prince of the Heavenly Host—by the divine power of God—cast into hell, Satan and all the evil spirits who roam throughout the world seeking the ruin of souls. Amen." },
  { id: "glory", title: "The Glory Be",
    text: "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.",
    note: "A bow of the head is made when the three Divine Persons are named together (as in the Glory Be), as a sign of reverence and honor." },
  { id: "hail", title: "The Hail Mary",
    text: "Hail Mary, full of grace, the Lord is with thee. Blessed are you among women, and blessed is the fruit of your womb, Jesus. Holy Mary, Mother of God, pray for us sinners now and at the hour of our death. Amen." },
  { id: "father", title: "The Our Father",
    text: "Our Father, who art in heaven, hallowed be thy name; Thy Kingdom come; Thy will be done on earth as it is in heaven. Give us this day, our daily bread; And Forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen." }
];

const COMMANDMENTS = [
  "I am the Lord, your God, you shall not have strange gods before Me.",
  "You shall not take the name of the Lord your God in vain.",
  "Remember to keep holy the Lord’s Day.",
  "Honor your Father and your Mother.",
  "You shall not kill.",
  "You shall not commit adultery.",
  "You shall not steal.",
  "You shall not bear false witness against your neighbor.",
  "You shall not covet your neighbor’s wife.",
  "You shall not covet your neighbor’s goods."
];

const GIFTS = ["Wisdom", "Understanding", "Right Judgment (Counsel)", "Courage (Fortitude)", "Knowledge", "Reverence (Piety)", "Wonder and awe (Fear of the Lord)"];

const SACRAMENTS = {
  "Sacraments of Initiation": ["Baptism", "Confirmation", "Eucharist"],
  "Sacraments of Healing": ["Reconciliation", "The Anointing of the Sick"],
  "Sacraments of Vocation (Service)": ["Holy Matrimony (Marriage)", "Holy Orders"]
};

const GOSPELS = ["Matthew", "Mark", "Luke", "John"];
const MYSTERIES = ["Joyful", "Luminous", "Sorrowful", "Glorious"];

const PARISH = [
  ["The Name of this Parish is", "Our Lady of the Assumption"],
  ["The Name of the Mission of this Parish is", "San Felipe Neri"],
  ["The name of our pastor is", "Rev. Ruben Delgado"],
  ["The name of our Pope", "Leo XIV"],
  ["The name of the Bishop of the Brownsville Diocese is", "Most Rev. Daniel Flores"]
];

const HOLY_DAYS = ["Mary, Mother of God (January 1st)", "Ascension of Our Lord", "Assumption", "All Saints Day (November 1st)", "Immaculate Conception", "Christmas"];

// Study page Q&A (word for word from the booklet)
const STUDY_QA = [
  ["Eucharist & Mass", "WHAT IS THE MASS?", "The celebration of the Eucharist, which includes both the Liturgy of the Word and the Liturgy of the Eucharist. The Mass makes present in an perpetual unbloody manner Christ’s once-for-all sacrifice on Calvary."],
  ["Eucharist & Mass", "WHAT IS THE HOLY EUCHARIST?", "“The BODY and BLOOD, SOUL and DIVINITY”, (Real Presence) of our Lord Jesus Christ, therefore, the whole Christ. (CCC, 1374)"],
  ["Eucharist & Mass", "THE GOSPEL OF SAINT JOHN 6:53", "Jesus said, “Amen, amen, I say to you, unless you eat the flesh of the Son of Man and drink his blood, you do not have life within you.”"],
  ["Eucharist & Mass", "EUCHARISTIC FAST", "To abstain from all food and drink (except water or medicine) one hour before. (Canon Law, n. 919)"],
  ["Eucharist & Mass", "HOW SHOULD WE PREPARE TO RECEIVE OUR LORD IN HOLY COMMUNION?", "Approach the sacrament with great reverence and awe, which should be reflected in our attitude and clothing. If we are in a state of mortal sin, go to Confession before going to Communion. Fast for at least one hour from all foods and liquids, except for water and medicine, before receiving Holy Communion."],
  ["Sin & Confession", "WHAT IS SIN?", "Sin is any thought, word, desire, or action that destroys or damages our union with God. (CCC, 1849)"],
  ["Sin & Confession", "HOW MANY KINDS OF SIN ARE THERE?", "There are two kinds of personal sin (actual sin that we ourselves freely commit) – mortal and venial."],
  ["Sin & Confession", "WHAT IS VENIAL SIN?", "Personal sin that weakens but does not kill our relationship with God."],
  ["Sin & Confession", "WHAT IS MORTAL SIN?", "Mortal sin is a sin that destroys our relationship with God. Mortal sin is a serious violation of God’s law. Personal sin that totally rejects God and alienates one from Him, causing a loss of love and sanctifying grace."],
  ["Sin & Confession", "WHEN ARE YOU GUILTY OF MORTAL SIN?", "To be guilty the following three conditions must be present:\na) Grave matter – such a nature that destroys love in us and turns us away from God.\nb) Full knowledge - You must realize that you are acting against your conscience and God’s law,\nc) Complete consent - You must freely choose to do it."],
  ["Sin & Confession", "WHAT IS THE SACRAMENT OF PENANCE?", "For those sins committed after Baptism, a person is reconciled with God and with the Church through the Sacrament of Penance. (CCC, 984-985)"],
  ["Sin & Confession", "WHY GO TO CONFESSION?", "THE GOSPEL OF SAINT JOHN 20:23 STATES: “Whose sins you forgive are forgiven them, and whose sins you retain are retained.”"],
  ["Sin & Confession", "WHAT IS ABSOLUTION?", "The priest sacramentally forgiving sins in the name of the Father, Son and Holy Spirit within the context of confession."],
  ["Bible", "WHAT IS THE CREED?", "The Creed is a summary of the Doctrines of the Christian faith. The Apostles’ Creed, which is often recited at the beginning of the Rosary, and the Nicene Creed or Profession of Faith, which is usually said at every Sunday Mass."],
  ["Bible", "IS EVERYTHING IN THE BIBLE TRUE?", "Scripture is inspired, meaning that God guided the human authors, who wrote only what God intended. Scripture is also inerrant, meaning that it teaches the truth, and not falsehood, taking into account the human author’s intention and human limitations, as well as the literary genres of the time."],
  ["Bible", "WHAT IS THE DIFFERENCE BETWEEN A “CATHOLIC BIBLE” AND A “PROTESTANT BIBLE”?", "Both include 27 books in the New Testament. Protestant Bibles have only 39 books in the Old Testament while Catholic Bibles have 46."],
  ["Church Teachings", "WHAT IS THE VOCATION OF EVERY CHRISTIAN?", "All baptized Christians are called by God to become like Jesus and, according to their state of life, to participate in the building up of the Church."],
  ["Church Teachings", "What to Say: “Are you saved?” asks the Fundamentalist.", "The Catholic should reply: “As the Bible says, I am already saved, but I am also being saved, and I have the hope that I will be saved. Like the apostle Paul, I am working out my salvation in fear and trembling with hopeful confidence in the promises of Christ."],
  ["Church Teachings", "WHAT IS THE SOUL?", "The soul is the immortal, spiritual principle that gives life to the human body. The soul does not come from our parents but is created by God at conception. Our soul will be reunited with our resurrected body at the end of time."],
  ["Church Teachings", "WHY DOES GOD, WHO IS ALL-LOVING AND ALL-POWERFUL, ALLOW SUFFERING AND EVIL?", "God does not cause suffering and evil, but permits it as a possibility of human freedom. God allows evil in order to bring forth something good. In fact, from the greatest of all moral evils--the murder of His Son--He brought forth the greatest of all goods: the glorification of Christ and our redemption."],
  ["Church Teachings", "WHAT DOES IT MEAN TO BE CHASTE?", "Chastity is a moral virtue, related to temperance, which enables us to successfully integrate our sexuality into our personality. A chaste person lives his or her sexuality intentionally, motivated by love and not by selfish desires."],
  ["Church Teachings", "DOES THE CHURCH CONDEMN GAYS OR LESBIANS (LGBTQIA+)?", "Pope Francis said, \"If a person is gay and seeks God and has good will, who am I to judge?\"\nThe Church does not condemn gays or lesbians but gay or lesbian acts. The Catechism further states that “Homosexual persons are called to chastity.”"],
  ["Church Teachings", "WHAT IS THE CHURCH’S POSITION ON GENDER?", "Born either male or female.\n“By creating the human being man and woman, God gives personal dignity equally to the one and the other. Each of them, man and woman, should acknowledge and accept his sexual identity.” CCC 2393"],
  ["Church Teachings", "WHAT IS HUMANAE VITAE (Latin: Of Human Life)?", "Written by Blessed Pope Paul VI in 1968, provides clear teaching about God's plan for married love and the transmission of life. Prohibits all forms of artificial contraception."],
  ["Church Teachings", "WHAT IS THE CHURCH’S POSITION ON ABORTION?", "Pro-Life NOT Pro-Choice.\nDirect abortion, or the intentional killing of a human being living in the womb, is always seriously immoral because as persons the right-to-life is the most basic and fundamental right we possess."],
  ["Church Teachings", "WHAT DOES THE CHURCH SAY ABOUT RELATIVISM?", "The thought that “Truth is in the eye of the beholder.”\nPope Benedict XVI then Cardinal Ratzinger, said that relativism, which is, letting oneself be ‘tossed here and there, swept along by every wind of teaching’, looks like the only attitude (acceptable) to today’s standards.” He warned: “We are moving towards a dictatorship of relativism which does not recognize anything as for certain and which has as it’s highest goal one’s own ego and one’s own desires.” (Objective vs Subjective Truth)"],
  ["Church Teachings", "WHAT IS PURGATORY?", "Purgatory is the state of those who die in God’s friendship, assured of their eternal salvation, but who still need purification to enter into the happiness of heaven. We can help the souls in purgatory by offering prayers and sacrifices for them."],
  ["Church Teachings", "DO WE PRAY TO THE CRUCIFIX OR THE SAINTS?", "We do not pray to the crucifix or images of Christ and of saints, but to the persons of who they remind us."],
  ["Mary & Saints", "WHAT IS THE FEAST OF MARY, MOTHER OF GOD?", "In 431, the Council of Ephesus officially recognized that Jesus is one person, with 2 natures, human and divine—united in a true union."],
  ["Mary & Saints", "WHAT IS THE FEAST OF THE ASSUMPTION?", "The Immaculate Virgin Mary, preserved free from all stain of original sin, when the course of her earthly life was finished, was taken up body and soul into heaven. (CCC 966)"],
  ["Mary & Saints", "WHY DO WE CALL THE BLESSED MOTHER EVER-VIRGIN?", "Mary was always a virgin, in conceiving Jesus, giving birth to Him and remaining Virgin after His birth. (CCC 510)"],
  ["Mary & Saints", "WHAT IS ALL SAINTS DAY?", "The witnesses who have preceded us into the kingdom, especially those by the example of their lives, the transmission of their writings, and their prayer today. We can and should ask them to intercede for us and for the whole world. (CCC 2683)"],
  ["Mary & Saints", "WHAT IS THE FEAST OF THE ASCENSION?", "“So then the Lord Jesus, after he had spoken to them, he ascended into heaven, and sat down at the right hand of God.” CCC(659)"],
  ["Mary & Saints", "WHAT IS THE IMMACULATE CONCEPTION?", "Mary possessed sanctifying grace from the first instant of her existence and was free from the lack of grace caused by the “original or first sin” at the beginning of human history."]
];

// Matching (from the worksheet answer list)
const MATCH_SETS = [
  { topic: "Sin & Confession", q: "Match each one (Church & Confession).", pairs: [
    ["A process in which your sins are forgiven by speaking to a priest", "Confession"],
    ["When a priest sacramentally forgives your sins", "Absolution"],
    ["Bishop of the Diocese of Brownsville", "Most Rev. Daniel Flores"],
    ["Pastor of Our Lady of the Assumption/San Felipe Neri Catholic Church", "Rev. Ruben Delgado"],
    ["Catholic Patron of Alcohol and drug addiction", "Venerable Matt Talbot"],
    ["Attend church every Sunday and Holy Days of Obligation", "One of the precepts of the church"],
    ["Date of my confirmation", "In May when the diocese determines"]
  ]},
  { topic: "Mary & Saints", q: "Match each one (Feasts & Mary).", pairs: [
    ["Feast of Mary, Mother of God", "January 1st"],
    ["Immaculate Virgin Mary taken up body and soul into Heaven", "Assumption"],
    ["Holy Day of Obligation in which those before us have gone into heaven and we look at their lives, writings as examples", "All Saints Day November 1st"],
    ["40 days after Easter in which Jesus is taken up to heaven", "Ascension of Our Lord"],
    ["Mary possessed sanctifying grace from the first instant of her existence", "Immaculate Conception"],
    ["Parents of the Blessed Virgin Mary", "Sts. Anna & Joachquin"],
    ["Announced to Mary she was chosen as the Mother of Jesus", "Archangel Gabriel"]
  ]},
  { topic: "Rosary", q: "Match each one (Rosary & Mary’s appearances).", pairs: [
    ["Appeared to Saint Juan Diego in Mexico City", "Virgen de Guadalupe"],
    ["Appeared to three Shepherd children in Portugal", "Our Lady of Fatima"],
    ["The first Glorious Mystery", "The Resurrection"],
    ["The third Joyful Mystery", "The Nativity"],
    ["The mysteries about Jesus ministry", "Luminous Mysteries"],
    ["Mysteries prayed on Sunday and Wednesday", "Glorious Mysteries"],
    ["Mysteries prayed during Lent", "Sorrowful mysteries"]
  ]},
  { topic: "Sin & Confession", q: "Match the 3 conditions of mortal sin to what they mean.", pairs: [
    ["Grave matter", "Such a nature that destroys love in us and turns us away from God"],
    ["Full knowledge", "You must realize that you are acting against your conscience and God’s law"],
    ["Complete consent", "You must freely choose to do it"]
  ]},
  { topic: "Holy Spirit", q: "Match each Gift of the Holy Spirit to its other name.", pairs: [
    ["Right Judgment", "Counsel"],
    ["Courage", "Fortitude"],
    ["Reverence", "Piety"],
    ["Wonder and awe", "Fear of the Lord"]
  ]}
];

// True or False (from the worksheet)
const TF = [
  ["Sacraments", "The Sacrament of Confirmation will take away the original sin.", false],
  ["Mary & Saints", "Our Lady of Guadalupe brought the message to always pray the Rosary.", false],
  ["Sin & Confession", "A Deacon can absolve us from sins.", false],
  ["Bible", "The Catholic bible has 7 more books in the Old Testament than a Protestant Bible.", true],
  ["Mary & Saints", "St. Anna was the grandmother of the Blessed Mother.", false],
  ["Church Teachings", "Adam and Eve were the first to commit sin and that is why we have the original sin.", true],
  ["Sacraments", "We receive grace when we receive the Sacraments.", true],
  ["Sin & Confession", "I do not need to confess if I believe I only have mortal sins.", false],
  ["Eucharist & Mass", "I may receive the Eucharist if I have fasted for at least 30 minutes before I receive it.", false],
  ["Mary & Saints", "We would be correct if we said St. Joachquin is Jesus’ grandfather.", true],
  ["Church Teachings", "Catholic means universal.", true],
  ["Holy Spirit", "We have 5 gifts from the Holy Spirit.", false],
  ["Parish & Leaders", "Pope Francis was our previous Pope.", true],
  ["Eucharist & Mass", "The mass is a sacrifice. It is a memorial of the past, present, and future.", true],
  ["Church Teachings", "The Church is not all baptized united in the same faith, same sacrifice, and the same sacraments under the Bishop.", false],
  ["Church Teachings", "Humanae Vitae prohibits all forms of artificial contraception.", true],
  ["Church Teachings", "Catholics are not Christians.", false],
  ["Sacraments", "We baptize infants instead of waiting until adults to distinguish the Catholic Church from others.", false],
  ["Church Teachings", "Catholics pray to the saints and crucifix.", false],
  ["Bible", "The Catholic Bible has 46 books in the New Testament.", false],
  ["Sin & Confession", "Sin is any thought, word, desire, action that destroys or damages our union with God.", true],
  ["Sin & Confession", "You are guilty of mortal sin if: it is a grave matter, you had full knowledge, and complete consent.", true],
  ["Sacraments", "The Sacrament of Baptism will forgive all the sins since you were born.", true],
  ["Church Teachings", "The church condemns all gays or lesbians.", false],
  ["Church Teachings", "All Catholics are saved therefore do not need to work towards their salvation.", false]
];

// Multiple choice (answer is always the first option; options get shuffled)
const MC = [
  ["Parish & Leaders", "The name of our pastor is:", ["Rev. Ruben Delgado", "Most Rev. Daniel Flores", "Venerable Matt Talbot", "Saint Juan Diego"]],
  ["Parish & Leaders", "The name of our Pope:", ["Leo XIV", "Francis", "Benedict XVI", "Paul VI"]],
  ["Parish & Leaders", "The name of the Bishop of the Brownsville Diocese is:", ["Most Rev. Daniel Flores", "Rev. Ruben Delgado", "Venerable Matt Talbot", "Cardinal Ratzinger"]],
  ["Parish & Leaders", "The Name of this Parish is:", ["Our Lady of the Assumption", "San Felipe Neri", "Our Lady of Fatima", "Virgen de Guadalupe"]],
  ["Parish & Leaders", "The Name of the Mission of this Parish is:", ["San Felipe Neri", "Our Lady of the Assumption", "Our Lady of Fatima", "Saint Juan Diego"]],
  ["Rosary", "The rosary has how many mysteries?", ["4", "3", "5", "7"]],
  ["Rosary", "Which are the Mysteries of the Rosary?", ["Joyful; Luminous; Sorrowful; Glorious", "Joyful; Sorrowful; Glorious; Holy", "Luminous; Divine; Sorrowful; Glorious", "Joyful; Luminous; Healing; Glorious"]],
  ["Sin & Confession", "The prayer that we say once we have confessed our sins is called:", ["The Act of Contrition", "The Glory Be", "The St. Michael Prayer", "The Hail Mary"]],
  ["Sin & Confession", "There are how many types of sins, and what are they?", ["2 – mortal and venial", "3 – mortal, venial and original", "2 – grave and small", "7 – one for each sacrament"]],
  ["Sin & Confession", "What is venial sin?", ["Personal sin that weakens but does not kill our relationship with God.", "Mortal sin is a sin that destroys our relationship with God.", "The sin of Adam and Eve.", "A sin that cannot be forgiven."]],
  ["Sin & Confession", "What is mortal sin?", ["A sin that destroys our relationship with God.", "Personal sin that weakens but does not kill our relationship with God.", "Any sin we forget to confess.", "A sin committed before Baptism."]],
  ["Sin & Confession", "What is absolution?", ["The priest sacramentally forgiving sins in the name of the Father, Son and Holy Spirit within the context of confession.", "The prayer we say after confessing our sins.", "To abstain from all food and drink one hour before Communion.", "A summary of the Doctrines of the Christian faith."]],
  ["Sin & Confession", "Through the Sacrament of Penance, a person is reconciled with:", ["God and with the Church", "Only the priest", "Only their family", "The Bishop"]],
  ["Sin & Confession", "Why go to Confession? Which Bible verse says: “Whose sins you forgive are forgiven them, and whose sins you retain are retained.”", ["John 20:23", "John 6:53", "CCC 1374", "Canon Law, n. 919"]],
  ["Sacraments", "There are how many sacraments?", ["7", "3", "10", "4"]],
  ["Sacraments", "I am preparing to receive the Sacrament of:", ["Confirmation", "Holy Orders", "Holy Matrimony (Marriage)", "The Anointing of the Sick"]],
  ["Eucharist & Mass", "The Holy Eucharist is:", ["The Body and Blood, Soul and Divinity of our Lord Jesus Christ", "Only a symbol of Jesus", "The Liturgy of the Word", "A summary of the Christian faith"]],
  ["Eucharist & Mass", "Eucharistic Fast: we abstain from all food and drink (except water or medicine) how long before Communion?", ["One hour", "30 minutes", "Three hours", "All day"]],
  ["Eucharist & Mass", "What is the Mass?", ["The celebration of the Eucharist, which includes both the Liturgy of the Word and the Liturgy of the Eucharist.", "A summary of the Doctrines of the Christian faith.", "The state of those who die in God’s friendship.", "The priest forgiving sins."]],
  ["Eucharist & Mass", "John 6:53: “…unless you eat the flesh of the Son of Man and drink his blood, you do not have ___.”", ["life within you", "the Holy Spirit", "eternal joy", "grace"]],
  ["Eucharist & Mass", "If we are in a state of mortal sin, what should we do before going to Communion?", ["Go to Confession", "Pray the Rosary only", "Fast for 30 minutes", "Nothing"]],
  ["Bible", "The four gospels are:", ["Matthew, Mark, Luke & John", "Matthew, Mark, Paul & John", "Mark, Luke, John & Gabriel", "Matthew, Luke, John & Michael"]],
  ["Bible", "How many books are in the Old Testament of a Catholic Bible?", ["46", "39", "27", "73"]],
  ["Bible", "How many books are in the Old Testament of a Protestant Bible?", ["39", "46", "27", "50"]],
  ["Bible", "How many books are in the New Testament (both Bibles)?", ["27", "39", "46", "7"]],
  ["Bible", "Scripture is inspired, meaning that:", ["God guided the human authors, who wrote only what God intended.", "It has no human authors.", "It was written in 431.", "Only priests can read it."]],
  ["Bible", "Which Creed is often recited at the beginning of the Rosary?", ["The Apostles’ Creed", "The Nicene Creed", "The Act of Contrition", "The Glory Be"]],
  ["Bible", "Which Creed (Profession of Faith) is usually said at every Sunday Mass?", ["The Nicene Creed", "The Apostles’ Creed", "The Our Father", "The St. Michael Prayer"]],
  ["Church Teachings", "What is the soul?", ["The immortal, spiritual principle that gives life to the human body.", "Something that comes from our parents.", "The body after the resurrection.", "A gift of the Holy Spirit."]],
  ["Church Teachings", "Where does the soul come from?", ["It is created by God at conception.", "It comes from our parents.", "It comes at Baptism.", "It comes at Confirmation."]],
  ["Church Teachings", "Why does God allow suffering and evil?", ["He permits it as a possibility of human freedom, in order to bring forth something good.", "God causes suffering to punish us.", "God is not all-powerful.", "Evil does not exist."]],
  ["Church Teachings", "Chastity is a moral virtue related to:", ["Temperance", "Fortitude", "Knowledge", "Wisdom"]],
  ["Church Teachings", "Humanae Vitae was written by:", ["Blessed Pope Paul VI in 1968", "Pope Francis in 1968", "Pope Benedict XVI in 2005", "The Council of Ephesus in 431"]],
  ["Church Teachings", "Relativism is the thought that:", ["“Truth is in the eye of the beholder.”", "Truth is objective.", "Scripture is inerrant.", "Catholic means universal."]],
  ["Church Teachings", "Who warned: “We are moving towards a dictatorship of relativism”?", ["Pope Benedict XVI (then Cardinal Ratzinger)", "Pope Francis", "Pope Paul VI", "Most Rev. Daniel Flores"]],
  ["Church Teachings", "What is the vocation of every Christian?", ["To become like Jesus and, according to their state of life, to participate in the building up of the Church.", "To become a priest.", "To read the whole Bible.", "To go to Mass only on Christmas."]],
  ["Church Teachings", "“Are you saved?” asks the Fundamentalist. The Catholic should reply:", ["“As the Bible says, I am already saved, but I am also being saved, and I have the hope that I will be saved.”", "“Yes, I am saved and do not need to do anything else.”", "“No, Catholics cannot be saved.”", "“Only priests are saved.”"]],
  ["Church Teachings", "What is the Church’s position on abortion?", ["Pro-Life NOT Pro-Choice", "Pro-Choice", "No position", "It depends"]],
  ["Church Teachings", "What is Purgatory?", ["The state of those who die in God’s friendship, assured of their eternal salvation, but who still need purification to enter into the happiness of heaven.", "Another name for hell.", "A place on earth.", "The Feast of the Ascension."]],
  ["Church Teachings", "How can we help the souls in purgatory?", ["By offering prayers and sacrifices for them", "We cannot help them", "By going to Confession for them", "By reading the Creed"]],
  ["Church Teachings", "Do we pray to the crucifix or the saints?", ["No – we pray to the persons of who they remind us.", "Yes – we pray to the crucifix itself.", "Yes – we pray to the statues.", "We never think about saints."]],
  ["Church Teachings", "There are how many days of obligation?", ["6", "4", "7", "10"]],
  ["Mary & Saints", "In 431, the Council of Ephesus officially recognized that:", ["Jesus is one person, with 2 natures, human and divine—united in a true union.", "Mary was taken up into heaven.", "There are 7 sacraments.", "The Bible has 46 books."]],
  ["Mary & Saints", "The Feast of the Assumption: Mary was:", ["Taken up body and soul into heaven", "Born without a soul", "A Protestant", "Only taken up in spirit"]],
  ["Mary & Saints", "Why do we call the Blessed Mother Ever-Virgin?", ["Mary was always a virgin, in conceiving Jesus, giving birth to Him and remaining Virgin after His birth.", "Because she was never married.", "Because she was an angel.", "Because of the Council of Ephesus in 1968."]],
  ["Mary & Saints", "What is the Immaculate Conception?", ["Mary possessed sanctifying grace from the first instant of her existence.", "Jesus ascended into heaven.", "Mary was taken up body and soul into heaven.", "The birth of Jesus."]],
  ["Mary & Saints", "On All Saints Day, we can and should ask the saints to:", ["Intercede for us and for the whole world", "Forgive our sins", "Give us the sacraments", "Replace prayer to God"]],
  ["Mary & Saints", "The Feast of the Ascension: after Jesus had spoken to them, He:", ["Ascended into heaven, and sat down at the right hand of God.", "Went to Portugal.", "Appeared to Saint Juan Diego.", "Was baptized."]],
  ["Holy Spirit", "How many Gifts of the Holy Spirit are there?", ["7", "5", "4", "10"]],
  ["Prayers", "When is a bow of the head made?", ["When the three Divine Persons are named together (as in the Glory Be)", "At the end of the Hail Mary", "During the Prayer Before a Meal", "Only at Christmas"]]
];
