import Header from "./Header";

function Main() {
    return (
        <div className={'mainPage'}>
            <Header/>
            <section className="Main">
                <div className="main_text">
                    <div className="first_text">
                        <span className="small_text">с</span>
                        <div className="big_text big_text_first">начинающего</div>
                    </div>
                    <div className="second_text">
                        <div className="inline_text_container"> {/* Контейнер для "до:" и "продвинутого" */}
                            <span className="small_text small_text_second">до:</span>
                            <div className="big_text big_text_second">продвинутого</div>
                        </div>
                        <div className={'level_and_button'}>
                            <div className="big_text big_text_second level_text">уровня</div>
                            <div className="add_text"> {/* Отдельный контейнер для подтекста и кнопки */}
                                <div className="subtext">Уроки плавания для <br/> взрослых и детей</div>
                                <button className="button">Присоединиться</button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default Main;