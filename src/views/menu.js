const menuTeplate = () => html`
 <div class="menu">
            <h1>Weekly Menu:</h1>
            <div class="starter">
                <h2>Starters:</h2>
                <div class="card-table">
                    <div class="food-card">
                        <h3><i class="fas fa-check"></i>Zelena Salata </h3>
                        <img src="/static/Images/salat.jpg" alt="" style="width:140px;height:120px;">
                    </div>
                    <div class="food-card">
                        <h3><i class="fas fa-check"></i>Zelena Salata</h3>
                        <img src="/static/Images/salat.jpg" alt="" style="width:140px;height:120px;">
                    </div>
                    <div class="food-card">
                        <h3><i class="fas fa-check"></i>Zelena Salata </h3>
                        <img src="/static/Images/salat.jpg" alt="" style="width:140px;height:120px;">
                    </div>
                    <div class="food-card">
                        <h3><i class="fas fa-check"></i>Zelena Salata </h3>
                        <img src="/static/Images/salat.jpg" alt="" style="width:140px;height:120px;">
                    </div>
                    <div class="food-card">
                        <h3><i class="fas fa-check"></i>Zelena Salata </h3>
                        <img src="/static/Images/salat.jpg" alt="" style="width:140px;height:120px;">
                    </div>
                    <div class="food-card">
                        <h3><i class="fas fa-check"></i>Zelena Salata </h3>
                        <img src="/static/Images/salat.jpg" alt="" style="width:140px;height:120px;">
                    </div>
                </div>
            </div>
            <div class="meal">
                <h2>Meals:</h2>
                <div class="card-table">
                    <div class="food-card">
                        <h3><i class="fas fa-check"></i>Musaka</h3>
                        <img src="static/Images/musaka.jpg" alt="" style="width:140px;height:120px;">
                    </div>
                    <div class="card-table">
                        <div class="food-card">
                            <h3><i class="fas fa-check"></i>Musaka</h3>
                            <img src="static/Images/musaka.jpg" alt="" style="width:140px;height:120px;">
                        </div>
                        <div class="card-table">
                            <div class="food-card">
                                <h3><i class="fas fa-check"></i>Musaka</h3>
                                <img src="static/Images/musaka.jpg" alt="" style="width:140px;height:120px;">
                            </div>
                            <div class="food-card">
                                <h3><i class="fas fa-check"></i>Musaka</h3>
                                <img src="static/Images/musaka.jpg" alt="" style="width:140px;height:120px;">
                            </div>
                            <div class="food-card">
                                <h3><i class="fas fa-check"></i>Musaka</h3>
                                <img src="static/Images/musaka.jpg" alt="" style="width:140px;height:120px;">
                            </div>
                            <div class="food-card">
                                <h3><i class="fas fa-check"></i>Musaka</h3>
                                <img src="static/Images/musaka.jpg" alt="" style="width:140px;height:120px;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`;

export async function menuPage(ctx){
    ctx.render(menuTeplate());
    ctx.userNav();
}