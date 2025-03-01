import React from "react";
import "./index.scss";

function Index(){
  return (
    <div className="documentation-container">
      <header>
        <h1 className="documentation-title">Layihə Haqqında</h1>
        <p className="documentation-description">
          Bu layihə tələbə ve muellim məlumatlarının idarə edilməsi və görüntülənməsi üçün hazırlanmış bir tətbiqdir.
        </p>
      </header>

      <section className="features">
        <h2 className="section-title">Əsas Xüsusiyyətlər</h2>
        <ul className="feature-list">
          <li>
            <strong>Form Daxili Məlumat:</strong> Tələbələrin adı, soyadı, e-poçt ünvanı və qiymətləri,ixtisaslari  daxil edilə bilər.
          </li>
          <li>
            <strong>Filtrləmə:</strong> İstifadəçilər müxtəlif kriteriyalar əsasında tələbə məlumatlarını filtrləyə
            bilərlər, məsələn, ixtisas və qiymətə görə . Mini projectimizin search ve pagenation kimi ustunlkleride vardir
          </li>
        </ul>
      </section>

      <section className="usage">
        <h2 className="section-title">İstifadə Qaydası</h2>
        <p>
          Bu tətbiqi istifadə etmək üçün aşağıdakı addımları izləyin:
        </p>
        <ol className="usage-steps">
          <li>Tələbə ve ya muellim məlumatlarını daxil edin</li>
          <li>hemin sehifeye kecid edib melumatlariniza baxin</li>
          <li>Cədvəldə istədiyiniz məlumatları görün və silmək istədiyiniz məlumatları seçin.</li>
          <li>Daha sonra isteyinize gore filtirleme proseslerini apara bilersinizz</li>
        </ol>
      </section>

      <footer className="documentation-footer">
        <p>Layihə müəllifi: <strong>Kazimova Lamiye</strong></p>
        <p>
          Daha çox məlumat üçün <a href="lamiyekazimova5@gmail.com">lamiyekazimova5@gmail.com</a> ilə əlaqə saxlayın.
        </p>
      </footer>
    </div>
  );
};


export default Index;